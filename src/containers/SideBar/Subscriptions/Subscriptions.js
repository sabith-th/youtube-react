import React from "react";
import { Divider } from "semantic-ui-react";
import { SideBarHeader } from "../SideBarHeader/SideBarHeader";
import { Subscription } from "./Subscription/Subscription";

export class Subscriptions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBarHeader title="Subscriptions" />
        <Subscription label="Music Channel" broadcasting />
        <Subscription label="Coursera" amountNewVideos={10} />
        <Subscription label="Ted" amountNewVideos={24} />
        <Subscription label="Stanford" amountNewVideos={7} />
        <Subscription label="Udacity" amountNewVideos={116} />
        <Subscription label="MIT" />
        <Divider />
      </React.Fragment>
    );
  }
}
