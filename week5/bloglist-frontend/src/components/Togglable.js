import React from "react";

class Togglable extends React.PureComponent {
  state = {
    show: false
  };

  toggleShow = () => {
    this.setState(prev => ({
      show: !prev.show
    }));
  };
  render() {
    return (
      <div>
        {this.state.show && this.props.children}
        <button type="button" onClick={this.toggleShow}>
          {this.state.show ? this.props.hideLabel : this.props.showLabel}
        </button>
      </div>
    );
  }
}

export default Togglable;
