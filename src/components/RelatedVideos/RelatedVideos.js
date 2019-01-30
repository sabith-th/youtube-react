import React from "react";
import { VideoPreview } from "../VideoPreview/VideoPreview";
import { NextUpVideo } from "./NextUpVideo/NextUpVideo";
import "./RelatedVideos.scss";

export const RelatedVideos = props => {
  return (
    <div className="related-videos">
      <NextUpVideo />
      <VideoPreview horizontal={true} />
      <VideoPreview horizontal={true} />
      <VideoPreview horizontal={true} />
    </div>
  );
};
