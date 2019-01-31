import React from "react";
import { RelatedVideos } from "../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../components/Video/Video";
import "./Watch.scss";

export class Watch extends React.Component {
  render() {
    return (
      <div className="watch-grid">
        <Video className="video" id="6ZfuNTqbHE8" />
        <div
          className="metadata"
          style={{ width: "100%", height: "100px", background: "#F91112" }}
        >
          Metadata
        </div>
        <div
          className="video-info-box"
          style={{ width: "100%", height: "100px", background: "#BD10E0" }}
        >
          Video Info box
        </div>
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
