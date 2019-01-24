import React from "react";
import { Divider, Menu } from "semantic-ui-react";
import "./SideBar.scss";
import { SideBarFooter } from "./SideBarFooter/SideBarFooter";
import { SideBarHeader } from "./SideBarHeader/SideBarHeader";
import { SideBarItem } from "./SideBarItem/SideBarItem";
import { Subscriptions } from "./Subscriptions/Subscriptions";

export class SideBar extends React.Component {
  render() {
    return (
      <Menu borderless vertical stackable fixed="left" className="side-nav">
        <SideBarItem highlight={true} label="Home" icon="home" />
        <SideBarItem label="Trending" icon="fire" />
        <SideBarItem label="Followers" icon="spy" />
        <Divider />
        <SideBarHeader title="Library" />
        <SideBarItem label="History" icon="history" />
        <SideBarItem label="Watch later" icon="clock" />
        <SideBarItem label="Liked videos" icon="thumbs up" />
        <Divider />
        <Subscriptions />
        <SideBarHeader title="More from YouTube" />
        <SideBarItem label="Movies and Shows" icon="film" />
        <Divider />
        <SideBarItem label="Report history" icon="flag" />
        <SideBarItem label="Help" icon="help circle" />
        <SideBarItem label="Send feedback" icon="comment" />
        <Divider />
        <SideBarFooter />
      </Menu>
    );
  }
}
