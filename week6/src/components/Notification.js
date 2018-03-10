import React from "react";

const Notification = ({ store }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return <div style={style}>{store.getState().notifications.message}</div>;
};

export default Notification;
