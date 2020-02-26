import React, { useState } from "react";
import Aux from "../Hoc";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.css";
import { connect } from "react-redux";

const layout = props => {

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        toggle={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.content}>{props.children}</main>
    </Aux>
  )
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
