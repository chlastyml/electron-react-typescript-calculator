import React, { Component } from "react";

type Props = {
    onClick?: any;
    size?: string;
    value: string;
    label: string;
};

class Button extends Component<Props> {
  public render() {
    return (
      <div
        onClick={this.props.onClick}
        className="Button"
        data-size={this.props.size}
        data-value={this.props.value}
      >
        {this.props.label}
      </div>
    );
  }
}

export default Button;
