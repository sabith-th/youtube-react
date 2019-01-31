import React from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import { Rating } from "../Rating/Rating";
import "./VideoMetadata.scss";

export const VideoMetadata = props => {
  const viewCount = Number(props.viewCount).toLocaleString() || "";
  return (
    <div className="video-metadata">
      <h3>Avengers: Infinity War Official Trailer</h3>
      <div className="video-stats">
        <span>{viewCount} views</span>
        <div className="video-actions">
          <Rating likeCount={500000} dislikeCount={50000} />
          <Button basic icon labelPosition="left">
            <Icon name="share" />
            Share
          </Button>
          <Button basic icon>
            <Icon name="add circle" />
          </Button>
          <Button basic icon>
            <Icon name="ellipsis horizontal" />
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};
