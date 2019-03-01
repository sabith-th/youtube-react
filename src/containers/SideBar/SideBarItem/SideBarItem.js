import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import "./SideBarItem.scss";

export class SideBarItem extends React.Component {
  render() {
    const highlight = this.shouldBeHighlighted() ? "highlight-item" : null;
    return (
      <Link to={{ pathname: this.props.path }}>
        <Menu.Item className={["sidebar-item", highlight].join(" ")}>
          <div className="sidebar-item-alignment-container">
            <span>
              <Icon size="large" name={this.props.icon} />
            </span>
            <span>{this.props.label}</span>
          </div>
        </Menu.Item>
      </Link>
    );
  }

  shouldBeHighlighted() {
    const { pathname } = this.props.location;
    if (this.props.path === "/") {
      return pathname === this.props.path;
    }
    return pathname.includes(this.props.path);
  }
}

export default withRouter(SideBarItem);
