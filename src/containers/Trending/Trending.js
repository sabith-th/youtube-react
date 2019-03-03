import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { InfiniteScroll } from "../../components/InfiniteScroll/InfiniteScroll";
import { VideoPreview } from "../../components/VideoPreview/VideoPreview";
import * as videoActions from "../../store/actions/video";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import {
  allMostPopularVideosLoaded,
  getMostPopularVideos,
  getMostPopularVideosNextPageToken
} from "../../store/reducers/videos";
import { SideBar } from "../SideBar/SideBar";
import "./Trending.scss";

export class Trending extends React.Component {
  render() {
    const previews = this.getVideoPreviews();
    const loaderActive = this.shouldShowLoader();
    return (
      <React.Fragment>
        <SideBar />
        <div className="trending">
          <InfiniteScroll
            bottomReachedCallback={this.fetchMoreVideos}
            showLoader={loaderActive}
          >
            {previews}
          </InfiniteScroll>
        </div>
      </React.Fragment>
    );
  }

  shouldShowLoader() {
    return !this.props.allMostPopularVideosLoaded;
  }

  fetchMoreVideos = () => {
    const { nextPageToken } = this.props;
    if (this.props.youtubeLibraryLoaded && nextPageToken) {
      this.props.fetchMostPopularVideos(12, true, nextPageToken);
    }
  };

  getVideoPreviews() {
    return this.props.videos.map(video => (
      <VideoPreview
        horizontal={true}
        expanded={true}
        video={video}
        key={video.id}
        pathname={"/watch"}
        search={`?v=${video.id}`}
      />
    ));
  }

  componentDidMount() {
    this.fetchTrendingVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
      this.fetchTrendingVideos();
    }
  }

  fetchTrendingVideos() {
    if (this.props.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos(20, true);
    }
  }
}

const mapStateToProps = state => {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state)
  };
};

const mapDispatchToProps = dispatch => {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
