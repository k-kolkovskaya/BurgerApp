import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styles from "./ContactData.css";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Kris",
                adress: {
                    street: "Teststreet",
                    zipcode: "233213",
                    country: "Belarus"
                },
                email: "test@gmail.com",
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log(e)
            });
    }

    render() {
        let form = (
            <form action="">
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData} >
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);