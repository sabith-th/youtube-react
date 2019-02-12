import { SUCCESS } from "../actions";
import { MOST_POPULAR } from "../actions/video";

const initialState = {
  byId: {},
  mostPopular: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(action.response, state);
    default:
      return state;
  }
};

const reduceFetchMostPopularVideos = (response, prevState) => {
  console.log("Response from youtube", response);
  const videoMap = response.items.reduce((accumulator, video) => {
    accumulator[video.id] = video;
    return accumulator;
  }, {});

  let items = Object.keys(videoMap);
  if (response.hasOwnProperty("prevPageToken") && prevState.mostPopular) {
    items = [...prevState.mostPopular.items, ...items];
  }

  const mostPopular = {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    items
  };

  return {
    ...prevState,
    mostPopular,
    byId: { ...prevState.byId, ...videoMap }
  };
};
