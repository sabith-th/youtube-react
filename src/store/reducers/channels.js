import { SUCCESS } from "../actions";
import { VIDEO_DETAILS, WATCH_DETAILS } from "../actions/watch";
import { CHANNEL_LIST_RESPONSE } from "../api/youtube-response-types";

const initialState = {
  byId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(action.response, state);
    case VIDEO_DETAILS[SUCCESS]:
      return reduceVideoDetails(action.response, state);
    default:
      return state;
  }
};

const reduceWatchDetails = (responses, prevState) => {
  const channelResponse = responses.find(
    response => response.result.kind === CHANNEL_LIST_RESPONSE
  );
  let channels = {};
  if (channelResponse && channelResponse.result.items) {
    const channel = channelResponse.result.items[0];
    channels[channel.id] = channel;
  }

  return {
    ...prevState,
    byId: {
      ...prevState.byId,
      ...channels
    }
  };
};

const reduceVideoDetails = (responses, prevState) => {
  const channelResponse = responses.find(
    response => response.result.kind === CHANNEL_LIST_RESPONSE
  );
  let channelEntry = {};
  if (channelResponse && channelResponse.result.items) {
    const channel = channelResponse.result.items[0];
    channelEntry = {
      [channel.id]: channel
    };
  }

  return {
    ...prevState,
    byId: {
      ...prevState.byId,
      ...channelEntry
    }
  };
};

export const getChannel = (state, channelId) => {
  if (!channelId) {
    return null;
  }
  return state.channels.byId[channelId];
};
