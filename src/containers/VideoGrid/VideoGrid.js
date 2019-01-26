import React from "react";
import { Divider } from "semantic-ui-react";
import { VideoPreview } from "../VideoPreview/VideoPreview";
import "./VideoGrid.scss";
import { VideoGridHeader } from "./VideoGridHeader/VideoGridHeader";

export const VideoGrid = props => {
  const divider = props.hideDivider ? null : <Divider />;
  return (
    <React.Fragment>
      <VideoGridHeader title={props.title} />
      <div className="video-grid">
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
        <VideoPreview />
      </div>
      {divider}
    </React.Fragment>
  );
};
