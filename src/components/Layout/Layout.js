import React, { Component } from "react";
import Aux from "../../hoc/Hoc";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.css";

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
        <Toolbar toggle={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSiteDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={styles.content}>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout;
