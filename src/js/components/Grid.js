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
        }
        this.masonry;
        //forces to realign items (eg. if image size changed);
        this.resetMasonryLayout = this.resetMasonryLayout.bind(this);
        //recollects items (eg. more images have been added to dom after initial masonry collection)
        this.reloadItems = this.reloadItems.bind(this);
        //appends element
        this.appendElement = this.appendElement.bind(this);
        this.destroyGrid = this.destroyGrid.bind(this);
    }

    componentDidMount() {
        this.initializeMasonry();
    }

    appendElement(el) {
        if(this.masonry)
            this.masonry.appended(el);
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
            columnWidth: 200,
            transitionDuration: "0.3s",
            gutter: 15
        });
        this.setState({ initialized: true });
    }

    render() {
        let data = this.props.data;
        return (
            <div className="grid" ref={(grid) => { this.grid = grid }}>
                {data.map((data, index) => {
                    return (
                        <GridItemWrapper data={data} key={index} gridItem={this.props.gridItem} append={this.appendElement}/>
                    );
                })}
            </div>
        );
    }
}

// requires props data, gridItem, append function
class GridItemWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finishedLoading: false,
            appended: false
        }
        this.finishedLoadingCallback = this.finishedLoadingCallback.bind(this);
    }

    finishedLoadingCallback(){
        this.setState({ finishedLoading: true });
    }

    componentDidMount(){
        if(this.state.finishedLoading && !this.state.appended && this.props.append){
            this.setState({ appended: true }, () => {
                this.props.append(this.el);
            });
        }  
    }

    componentDidUpdate(){
        if(this.state.finishedLoading && !this.state.appended && this.props.append){
            this.setState({ appended: true }, () => {
                this.props.append(this.el);
            });
        }  
    }

    render(){
        let style = (!this.state.finishedLoading)?{display:"none"}:{};
        let className = (this.state.finishedLoading)?"grid-item":"";

        let GridItem = this.props.gridItem;
        return(
            <div className={className} style={style} ref={(el)=>{this.el=el}}>
                <GridItem finishedLoading={this.finishedLoadingCallback} data={this.props.data} />
            </div>
        );
    }
}

export default Grid;