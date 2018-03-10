import React from "react";
import { changeFilter } from "../reducers/filterReducer";

class Filter extends React.Component {
  handleChange = e => {
    this.props.store.dispatch(changeFilter(e.target.value));
  };
  render() {
    const style = {
      marginBottom: 10
    };

    return (
      <div style={style}>
        filter{" "}
        <input
          onChange={this.handleChange}
          value={this.props.store.getState().filter}
        />
      </div>
    );
  }
}

export default Filter;
