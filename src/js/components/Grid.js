import React from "react";
import Masonry from "masonry-layout";


//passed prop "gridItem" will receive props:
//1. callback prop that should be called once item is ready to be appended to grid
//2. data = object/value of array iteration
class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            lastAppended: -1, // last appended item used for sequential loading and deciding if finishedLoading callback should be called
            sequentialLoad: props.sequentialLoad || false, // items should be loaded in sequence, not randomly
            finishedLoading: props.finishedLoading || false
        };
        this.masonry;
        this.appended = 0;
        //forces to realign items (eg. if image size changed);
        this.resetMasonryLayout = this.resetMasonryLayout.bind(this);
        //recollects items (eg. more images have been added to dom after initial masonry collection)
        this.reloadItems = this.reloadItems.bind(this);

        this.appendElement = this.appendElement.bind(this);

        this.destroyGrid = this.destroyGrid.bind(this);
    }

    componentDidMount() {
        this.initializeMasonry();
    }

    appendElement(el, index) {
        if(!this.masonry)
            return;

        if(this.state.sequentialLoad){
            this.masonry.appended(el);
            //set index of recently loaded image 
            this.setState({lastAppended: index});
        }else{
            this.masonry.appended(el);
        }

    }

    resetMasonryLayout() {
        if(this.masonry)
            this.masonry.layout();
        
    }
    reloadItems() {
        if(this.masonry)
            this.masonry.reloadItems();
    }
    destroyGrid(){
        if(this.masonry)
            this.masonry.destroy();
    }

    initializeMasonry() {
        this.masonry = new Masonry( this.grid, {
            itemSelector: ".grid-item",
            columnWidth: ".grid-sizer",
            transitionDuration: "0.3s",
            gutter: 4,
            fitWidth: true,
            horizontalOrder: true
        });
        this.setState({ initialized: true });
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.data.length !== nextProps.data.length || this.state.lastAppended !== nextState.lastAppended)
            return true;
        return false;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.data.length !== prevProps.data.length ){
            this.resetMasonryLayout();
        }
    }

    componentWillUnmount(){
        this.destroyGrid();
    }


    render() {
        let data = this.props.data;
        if(this.state.finishedLoading){
            if(this.state.lastAppended + 1 === this.props.data.length && this.state.lastAppended >= 0)
                this.state.finishedLoading();
        }

        return (
            <div className="grid" ref={(grid) => { this.grid = grid; }}>
                <div className="grid-sizer"></div>
                {data.map((data, index) => {
                    let canBeAppended = (this.state.sequentialLoad)?(index <= this.state.lastAppended+1):true;
                    return (
                        <GridItemWrapper {...this.props} data={data} key={data._id} gridItem={this.props.gridItem} canBeAppended={canBeAppended} append={(el) => { this.appendElement(el, index); }}/>
                    );
                })}
            </div>
        );
    }
}

// requires props data, gridItem, append function, canBeAppended
class GridItemWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finishedLoading: false,
            appended: false
        };
        this.finishedLoadingCallback = this.finishedLoadingCallback.bind(this);
    }

    finishedLoadingCallback(){
        this.setState({ finishedLoading: true });
    }

    componentDidUpdate(){
        if(this.state.finishedLoading && this.props.canBeAppended && !this.state.appended && this.props.append){
            this.setState({ appended: true }, () => {
                this.props.append(this.el);
            });
        }
    }

    render(){
        //set display to none so item wouldn't appear until appended
        //set className to empty so masonry wouldn't add item itself
        let style = (!this.state.finishedLoading || !this.props.canBeAppended)?{display:"none"}:{};
        let className = (this.state.finishedLoading && this.props.canBeAppended)?"grid-item":"";

        let GridItem = this.props.gridItem;
        return(
            <div className={className} style={style} ref={(el)=>{this.el=el;}}>
                <GridItem {...this.props} finishedLoading={this.finishedLoadingCallback} data={this.props.data} />
            </div>
        );
    }
}

export default Grid;