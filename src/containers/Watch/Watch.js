import React from "react";
import { RelatedVideos } from "../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../components/Video/Video";
import { VideoInfoBox } from "../../components/VideoInfoBox/VideoInfoBox";
import { VideoMetadata } from "../../components/VideoMetadata/VideoMetadata";
import "./Watch.scss";

export class Watch extends React.Component {
  render() {
    return (
      <div className="watch-grid">
        <Video className="video" id="6ZfuNTqbHE8" />
        <VideoMetadata className="metadata" viewCount={10000000} />
        <VideoInfoBox className="video-info-box" />
        <div
          className="comments"
          style={{ width: "100%", height: "100px", background: "#9013FE" }}
        >
          Comments
        </div>
        <RelatedVideos className="related-videos" />
      </div>
    );
  }
}
