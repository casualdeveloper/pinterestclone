import React from "react";
import PropTypes from "prop-types"

const propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}

const defaultProps = {
    className: "",
    onClick: () =>{return;}
}

export default class Card extends React.Component {
    render() {
        let className = "card__body ";

        if(this.props.fill) {
            className += "card__body--fill ";
        }
        
        className += this.props.className;

        return (
            <div onClick={this.props.onClick} className={className}>
                {this.props.children}
            </div>
        );
    }
}

Card.propTypes = { ...propTypes, fill: PropTypes.bool };
Card.defaultProps = { ...defaultProps };





Card.Title = (props) => {
    let className = "card__title ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className} >
            {props.children}
        </div>
    );
}

Card.Title.propTypes = { ...propTypes };
Card.Title.defaultProps = { ...defaultProps };





Card.Text = (props) => {
    let className = "card__text ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className} >
            {props.children}
        </div>
    );
}

Card.Text.propTypes = { ...propTypes };
Card.Text.defaultProps = { ...defaultProps };





Card.Action = (props) => {
    let className = "card__actions ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className}>
            {props.children}
        </div>
    )
}

Card.Action.propTypes = { ...propTypes };
Card.Action.defaultProps = { ...defaultProps };





Card.Media = (props) => {
    let className = "card__media ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className}>
            {props.children}
        </div>
    )
}

Card.Media.propTypes = { ...propTypes };
Card.Media.defaultProps = { ...defaultProps };





Card.Header = (props) => {
    let className = "card__header ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className}>
            {props.children}
        </div>
    )
}

Card.Header.propTypes = { ...propTypes };
Card.Header.defaultProps = { ...defaultProps };

Card.Header.TextContainer = (props) => {
    let className = "card__header__text-container ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className}>
            {props.children}
        </div>
    );
}

Card.Header.TextContainer.propTypes = { ...propTypes };
Card.Header.TextContainer.defaultProps = { ...defaultProps };


Card.Header.Title = (props) => {
    let className = "card__header__title ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className} >
            {props.children}
        </div>
    )
}

Card.Header.Title.propTypes = { ...propTypes };
Card.Header.Title.defaultProps = { ...defaultProps };

Card.Header.Subtitle = (props) => {
    let className = "card__header__subtitle ";
    className += props.className;

    return (
        <div onClick={props.onClick} className={className} >
            {props.children}
        </div>
    )
}

Card.Header.Subtitle.propTypes = { ...propTypes };
Card.Header.Subtitle.defaultProps = { ...defaultProps };


export { Card };