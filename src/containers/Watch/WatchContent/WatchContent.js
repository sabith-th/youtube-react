import React from "react";
import { connect } from "react-redux";
import { InfiniteScroll } from "../../../components/InfiniteScroll/InfiniteScroll";
import { RelatedVideos } from "../../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../../components/Video/Video";
import { VideoInfoBox } from "../../../components/VideoInfoBox/VideoInfoBox";
import { VideoMetadata } from "../../../components/VideoMetadata/VideoMetadata";
import { getChannel } from "../../../store/reducers/channels";
import { getCommentsForVideo } from "../../../store/reducers/comments";
import {
  getAmountComments,
  getRelatedVideos,
  getVideoById
} from "../../../store/reducers/videos";
import { Comments } from "../../Comments/Comments";
import "./WatchContent.scss";

export class WatchContent extends React.Component {
  render() {
    if (!this.props.videoId) {
      return <div />;
    }
    return (
      <InfiniteScroll
        bottomReachedCallback={this.props.bottomReachedCallback}
        showLoader={this.shouldShowLoader()}
      >
        <div className="watch-grid">
          <Video className="video" id={this.props.videoId} />
          <VideoMetadata className="metadata" video={this.props.video} />
          <VideoInfoBox
            className="video-info-box"
            video={this.props.video}
            channel={this.props.channel}
          />
          <Comments
            className="comments"
            comments={this.props.comments}
            amountComments={this.props.amountComments}
          />
          <RelatedVideos
            className="related-videos"
            videos={this.props.relatedVideos}
          />
        </div>
      </InfiniteScroll>
    );
  }

  shouldShowLoader() {
    return !!this.props.nextPageToken;
  }
}

const mapStateToProps = (state, props) => {
  const { videoId, channelId } = props;
  return {
    relatedVideos: getRelatedVideos(state, videoId),
    video: getVideoById(state, videoId),
    channel: getChannel(state, channelId),
    comments: getCommentsForVideo(state, videoId),
    amountComments: getAmountComments(state, videoId)
  };
};

export default connect(
  mapStateToProps,
  null
)(WatchContent);
