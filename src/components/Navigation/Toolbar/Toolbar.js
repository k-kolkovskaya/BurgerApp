import React from "react";
import styles from "./Toolbar.css";
import Logo from "../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.toggle} />
    <Logo height="80%" />
    <nav className={styles.DesctopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
