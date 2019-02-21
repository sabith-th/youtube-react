import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as watchActions from "../../store/actions/watch";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import WatchContent from "./WatchContent/WatchContent";

export class Watch extends React.Component {
  render() {
    const videoId = this.getVideoId();
    return <WatchContent videoId={videoId} />;
  }

  getVideoId() {
    const searchParams = new URLSearchParams(this.props.location.search);
    return searchParams.get("v");
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
}

const mapStateToProps = state => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state)
  };
};

const mapDispatchToProps = dispatch => {
  const fetchWatchDetails = watchActions.details.request;
  return bindActionCreators({ fetchWatchDetails }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Watch)
);
