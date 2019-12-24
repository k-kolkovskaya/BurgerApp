import React from "react";
import styles from "./CheckoutSummary.css";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
    return (
        <div className={styles.checkoutSummary}>
            <h1>We hope it tastes well!!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btntype="Danger">Cancel</Button>
            <Button btntype="Success">Continue</Button>
        </div>
    );
}

export default checkoutSummary;