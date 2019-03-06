import { REQUEST, SUCCESS } from "../actions";
import { SEARCH_FOR_VIDEOS } from "../actions/search";

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_FOR_VIDEOS[SUCCESS]:
      return reduceSearchForVideos(action.response, action.searchQuery, state);
    case SEARCH_FOR_VIDEOS[REQUEST]:
      return action.nextPageToken ? state : {};
    default:
      return state;
  }
};

const reduceSearchForVideos = (response, searchQuery, prevState) => {
  let searchResults = response.items.map(item => ({
    ...item,
    id: item.id.videoId
  }));
  if (prevState.query === searchQuery) {
    const prevResults = prevState.results || [];
    searchResults = prevResults.concat(searchResults);
  }
  return {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    query: searchQuery,
    results: searchResults
  };
};

export const getSearchResults = state => state.search.results;

export const getSearchNextPageToken = state => state.search.nextPageToken;
