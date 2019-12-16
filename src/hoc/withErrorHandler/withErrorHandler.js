import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Hoc";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }

        componentDidMount() {
            axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request;
            });
            axios.interceptors.response.use(res => res, e => {
                this.setState({ error: e })
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
    }
}

export default withErrorHandler;