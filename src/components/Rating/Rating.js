import React from "react";
import { Icon, Progress } from "semantic-ui-react";
import "./Rating.scss";

export const Rating = props => {
  let progress = null;
  const { likeCount, dislikeCount } = props;
  if (likeCount && dislikeCount) {
    const percent = 100 * (likeCount / (likeCount + dislikeCount));
    progress = <Progress className="progress" percent={percent} size="tiny" />;
  }

  return (
    <div className="rating">
      <div className="thumbs-up">
        <Icon name="thumbs outline up" />
        <span>{likeCount}</span>
      </div>
      <div className="thumbs-down">
        <Icon name="thumbs down outline" />
        <span>{dislikeCount}</span>
      </div>
      {progress}
    </div>
  );
};
