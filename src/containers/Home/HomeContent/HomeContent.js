import React from "react";
import { connect } from "react-redux";
import { VideoGrid } from "../../../components/VideoGrid/VideoGrid";
import { getMostPopularVideos } from "../../../store/reducers/videos";
import "./HomeContent.scss";

const AMOUNT_TRENDING_VIDEOS = 12;

export class HomeContent extends React.Component {
  render() {
    const trendingVideos = this.getTrendingVideos();
    return (
      <div className="home-content">
        <div className="responsive-video-grid-container">
          <VideoGrid title="Trending" videos={trendingVideos} />
          <VideoGrid title="Technology" hideDivider={true} />
        </div>
      </div>
    );
  }

  getTrendingVideos() {
    return this.props.mostPopularVideos.slice(0, AMOUNT_TRENDING_VIDEOS);
  }
}

const mapStateToProps = state => {
  return {
    mostPopularVideos: getMostPopularVideos(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeContent);
