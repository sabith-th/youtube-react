import React from "react";
import { RelatedVideos } from "../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../components/Video/Video";
import { VideoInfoBox } from "../../components/VideoInfoBox/VideoInfoBox";
import { VideoMetadata } from "../../components/VideoMetadata/VideoMetadata";
import { Comments } from "../Comments/Comments";
import "./Watch.scss";

export class Watch extends React.Component {
  render() {
    return (
      <div className="watch-grid">
        <Video className="video" id="6ZfuNTqbHE8" />
        <VideoMetadata className="metadata" viewCount={10000000} />
        <VideoInfoBox className="video-info-box" />
        <Comments className="comments" />
        <RelatedVideos className="related-videos" />
      </div>
    );
  }

  getVideoId() {
    const searchParams = new URLSearchParams(this.props.location.search);
    return searchParams.get("v");
  }
}
