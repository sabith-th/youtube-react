import React from "react";
import { Icon, Progress } from "semantic-ui-react";
import { getShortNumberString } from "../../services/number/number-format";
import "./Rating.scss";

export const Rating = props => {
  let rating = null;
  let likeCount = props.likeCount !== 0 ? props.likeCount : null;
  let dislikeCount = null;
  if (props.likeCount && props.dislikeCount) {
    const amountLikes = parseFloat(props.likeCount);
    const amountDislikes = parseFloat(props.dislikeCount);
    const percentPostiveRating =
      100.0 * (amountLikes / (amountDislikes + amountLikes));
    likeCount = getShortNumberString(amountLikes);
    dislikeCount = getShortNumberString(amountDislikes);
    rating = (
      <Progress
        className="progress"
        percent={percentPostiveRating}
        size="tiny"
      />
    );
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
      {rating}
    </div>
  );
};
