import React from "react";
import { VideoGrid } from "../VideoGrid/VideoGrid";
import "./Home.scss";

export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="responsive-video-grid-container">
          <VideoGrid title="Trending" />
          <VideoGrid title="Technology" hideDivider={true} />
        </div>
      </div>
    );
  }
}
