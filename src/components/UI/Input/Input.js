import React from "react";
import styles from "./Input.css";

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.inputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.invalid);
    }

    switch (props.elementType) {
        case ("input"):
            inputElement = <input
                className={inputStyles.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ("textarea"):
            inputElement = <textarea
                className={inputStyles.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ("select"):
            inputElement = (
                <select
                    className={inputStyles.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputStyles.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }

    return (
        <div className={styles.input}>
            <label htmlFor="" className={styles.label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;