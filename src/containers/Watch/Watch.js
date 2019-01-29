import React from "react";
import { VideoPreview } from "../../components/VideoPreview/VideoPreview";
import "./Watch.scss";

export class Watch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <VideoPreview horizontal={true} />
        <VideoPreview />
      </React.Fragment>
    );
  }
}
