import React from "react";
import "./Video.scss";

const BASE_EMBED_URL = "https://www.youtube.com/embed/";

export const Video = props => {
  if (!props.id) {
    return null;
  }

  const embedUrl = `${BASE_EMBED_URL}${props.id}`;

  return (
    <div className="video-container">
      <div className="video">
        <iframe
          title={"video"}
          width={"560"}
          height={"315"}
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="video-player"
        />
      </div>
    </div>
  );
};
