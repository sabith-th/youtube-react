import { SUCCESS } from "../actions";
import { WATCH_DETAILS } from "../actions/watch";
import { CHANNEL_LIST_RESPONSE } from "../api/youtube-response-types";

const initialState = {
  byId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(action.response, state);
    default:
      return state;
  }
};

const reduceWatchDetails = (response, prevState) => {
  const channelResponse = response.find(
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
