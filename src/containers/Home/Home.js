import React from "react";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid";
import { SideBar } from "../SideBar/SideBar";
import "./Home.scss";

export class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <div className="home">
          <div className="responsive-video-grid-container">
            <VideoGrid title="Trending" />
            <VideoGrid title="Technology" hideDivider={true} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
