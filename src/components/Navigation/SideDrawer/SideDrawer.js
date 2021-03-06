import React from "react";
import styles from "./SideDrawer.css";
import Logo from "../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Hoc";

const sideDrawer = props => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedStyles.join(" ")} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
