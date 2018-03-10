import React from "react";
import { connect } from "react-redux";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1
};

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div style={style}>{message}</div>;
};

export default connect(({ notifications: { message } }) => ({
  message
}))(Notification);
