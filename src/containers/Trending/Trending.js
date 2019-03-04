import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { VideoList } from "../../components/VideoList/VideoList";
import * as videoActions from "../../store/actions/video";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import {
  allMostPopularVideosLoaded,
  getMostPopularVideos,
  getMostPopularVideosNextPageToken
} from "../../store/reducers/videos";

export class Trending extends React.Component {
  render() {
    const loaderActive = this.shouldShowLoader();
    return (
      <VideoList
        bottomReachedCallback={this.fetchMoreVideos}
        showLoader={loaderActive}
        videos={this.props.videos}
      />
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
