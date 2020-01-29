import React, { Component } from "react";
import Aux from "../Hoc";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.css";
import { connect } from "react-redux";

class Layout extends Component {

  state = {
    showSiteDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSiteDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState({
      showSiteDrawer: !this.state.showSiteDrawer
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSiteDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={styles.content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
