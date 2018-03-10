import React from "react";
import { changeFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

class Filter extends React.Component {
  handleChange = e => {
    this.props.changeFilter(e.target.value);
  };
  render() {
    const style = {
      marginBottom: 10
    };

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} value={this.props.filter} />
      </div>
    );
  }
}

export default connect(
  ({ filter }) => ({
    filter
  }),
  { changeFilter }
)(Filter);
