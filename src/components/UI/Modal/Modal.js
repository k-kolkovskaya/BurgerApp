import React from "react";
import Aux from ".././../../hoc/Hoc";
import styles from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.Modal}
        style={{
          display: props.show ? "block" : "none",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  )
}

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
