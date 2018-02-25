import React from "react";

const Notification = ({ message, success = true }) => (
  <div style={{ border: success ? "1px solid green" : "1px solid red" }}>
    {message}
  </div>
);

export default Notification;
