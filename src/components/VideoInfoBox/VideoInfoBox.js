import React from "react";
import Linkify from "react-linkify";
import { Button, Image } from "semantic-ui-react";
import { getPublishedAtDateString } from "../../services/date/date-format";
import { getShortNumberString } from "../../services/number/number-format";
import "./VideoInfoBox.scss";

export class VideoInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  onToggleCollapseButtonClick = () => {
    this.setState(prevState => {
      return {
        collapsed: !prevState.collapsed
      };
    });
  };

  render() {
    if (!this.props.video || !this.props.channel) {
      return <div />;
    }

    const { channel } = this.props;
    const buttonText = this.getSubscriberButtonText();
    const channelThumbnail = channel.snippet.thumbnails.medium.url;
    const channelTitle = channel.snippet.title;
    const descriptionParagraphs = this.getDescriptionParagraphs();
    const { descriptionTextClass, buttonTitle } = this.getConfig();
    const publishedAtString = getPublishedAtDateString(
      this.props.video.snippet.publishedAt
    );

    return (
      <div className="video-info-box">
        <Image className="channel-image" src={channelThumbnail} circular />
        <div className="video-info">
          <div className="channel-name">{channelTitle}</div>
          <div className="video-publication-date">{publishedAtString}</div>
        </div>
        <Button color="youtube">{buttonText}</Button>
        <div className="video-description">
          <div className={descriptionTextClass}>{descriptionParagraphs}</div>
          <Button compact onClick={this.onToggleCollapseButtonClick}>
            {buttonTitle}
          </Button>
        </div>
      </div>
    );
  }

  getConfig() {
    let descriptionTextClass = "collapsed";
    let buttonTitle = "Show More";
    if (!this.state.collapsed) {
      descriptionTextClass = "expanded";
      buttonTitle = "Show Less";
    }
    return {
      descriptionTextClass,
      buttonTitle
    };
  }

  getDescriptionParagraphs() {
    const videoDescription = this.props.video.snippet
      ? this.props.video.snippet.description
      : null;
    if (!videoDescription) {
      return null;
    }
    return videoDescription.split("\n").map((paragraph, index) => (
      <p key={index}>
        <Linkify>{paragraph}</Linkify>
      </p>
    ));
  }

  getSubscriberButtonText() {
    const { channel } = this.props;
    const parsedSubscriberCount = Number(channel.statistics.subscriberCount);
    const subscriberCount = getShortNumberString(parsedSubscriberCount);
    return `Subscribe ${subscriberCount}`;
  }
}
