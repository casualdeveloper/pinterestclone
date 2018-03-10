import React from "react";
import PropTypes from "prop-types";

const generateHash = () => {
    return (Math.random() + 1).toString(36).substr(2,5);
}

export default class Input extends React.Component {
    constructor(props){
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        /**
         * Set input attribute "value" with new value
         * css uses value attribute to detect if its empty or not
         * if input field is empty label will return to resting position 
         * covering input field
         * 
         * the reason we need to keep changing this attribute
         * is because css only detects initial value
         */
        e.target.setAttribute("value", e.target.value);


        /**
         * Call custom onChange function
         */
        if(this.props.onChange){
            this.props.onChange(e);
        }
    }

    render() {
        let { 
            id,
            name,
            fill,
            type,
            error,
            label,
            helper,
            value,
            required,
            placeholder,
            autocomplete
        } = this.props;

        let style = "input ";
        style += (fill)?"fill ":"";
        style += (error)?"error ":"";

        const Label = () => {
            if(label) {
                return (<label className="label" for={id}>{label}</label>);
            }
            return null;
        }

        const Helper = () => {
            if(helper || ( error && typeof(error) === "string" )) {
                //replace helper in case of error
                let renderText = error?error:helper;
                return (<label className="helper" for={id}>{renderText}</label>);
            }
            return null;
        }

        return (
            <span className="input-wrapper">
                <input
                    onChange={this.handleOnChange}
                    className={style}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autocomplete={autocomplete}
                    value={value}
                />

                <span className="input__bottom-bar"></span>

                <Label />
                <Helper />

            </span>
        );
    }
}

const errorPropTypes = [
    PropTypes.bool,
    PropTypes.string
];

Input.propTypes = {
              id: PropTypes.string,
            name: PropTypes.string,
            fill: PropTypes.bool,
            type: PropTypes.oneOf(["text", "password", "email"]),
           label: PropTypes.string,
           error: PropTypes.oneOfType(errorPropTypes),
           value: PropTypes.string,
          helper: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
     placeholder: PropTypes.string,
    autocomplete: PropTypes.string,
}



Input.defaultProps = {
    id: generateHash(),
    password: false,
    type: "text"
}

export { Input };