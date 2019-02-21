import React from "react";
import { connect } from "react-redux";
import { RelatedVideos } from "../../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../../components/Video/Video";
import { VideoInfoBox } from "../../../components/VideoInfoBox/VideoInfoBox";
import { VideoMetadata } from "../../../components/VideoMetadata/VideoMetadata";
import { getVideoById } from "../../../store/reducers/videos";
import { Comments } from "../../Comments/Comments";
import "./WatchContent.scss";

export class WatchContent extends React.Component {
  render() {
    if (!this.props.videoId) {
      return <div />;
    }
    return (
      <div className="watch-grid">
        <Video className="video" id={this.props.videoId} />
        <VideoMetadata className="metadata" video={this.props.video} />
        <VideoInfoBox className="video-info-box" video={this.props.video} />
        <Comments className="comments" />
        <RelatedVideos className="related-videos" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    video: getVideoById(state, props.videoId)
  };
};

export default connect(
  mapStateToProps,
  null
)(WatchContent);
