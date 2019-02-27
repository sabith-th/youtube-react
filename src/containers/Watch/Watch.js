import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getSearchParam } from "../../services/url";
import * as commentActions from "../../store/actions/comment";
import * as watchActions from "../../store/actions/watch";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { getCommentNextPageToken } from "../../store/reducers/comments";
import { getChannelId } from "../../store/reducers/videos";
import WatchContent from "./WatchContent/WatchContent";

export class Watch extends React.Component {
  render() {
    const videoId = this.getVideoId();
    return (
      <WatchContent
        videoId={videoId}
        channelId={this.props.channelId}
        bottomReachedCallback={this.fetchMoreComments}
        nextPageToken={this.props.nextPageToken}
      />
    );
  }

  getVideoId() {
    return getSearchParam(this.props.location, "v");
  }

  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }

  fetchWatchContent() {
    const videoId = this.getVideoId();
    if (!videoId) {
      this.props.history.push("/");
    }
    this.props.fetchWatchDetails(videoId, this.props.channelId);
  }

  fetchMoreComments = () => {
    if (this.props.nextPageToken) {
      this.props.fetchCommentThread(
        this.getVideoId(),
        this.props.nextPageToken
      );
    }
  };
}

const mapStateToProps = (state, props) => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, "v"),
    nextPageToken: getCommentNextPageToken(state, props.location)
  };
};

const mapDispatchToProps = dispatch => {
  const fetchWatchDetails = watchActions.details.request;
  const fetchCommentThread = commentActions.thread.request;
  return bindActionCreators(
    { fetchWatchDetails, fetchCommentThread },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Watch)
);
