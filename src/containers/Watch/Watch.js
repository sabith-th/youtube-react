import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getSearchParam } from "../../services/url";
import * as watchActions from "../../store/actions/watch";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { getChannelId } from "../../store/reducers/videos";
import WatchContent from "./WatchContent/WatchContent";

export class Watch extends React.Component {
  render() {
    const videoId = this.getVideoId();
    return <WatchContent videoId={videoId} channelId={this.props.channelId} />;
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
}

const mapStateToProps = (state, props) => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, "v")
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
