import { createSelector } from "reselect";
import { getSearchParam } from "../../services/url";
import { SUCCESS } from "../actions";
import {
  MOST_POPULAR,
  MOST_POPULAR_BY_CATEGORY,
  VIDEO_CATEGORIES
} from "../actions/video";
import { VIDEO_DETAILS, WATCH_DETAILS } from "../actions/watch";
import {
  SEARCH_LIST_RESPONSE,
  VIDEO_LIST_RESPONSE
} from "../api/youtube-response-types";

const initialState = {
  byId: {},
  mostPopular: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(action.response, state);
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(action.response, state);
    case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
      return reduceFetchMostPopularVideosByCategory(
        action.response,
        action.categories,
        state
      );
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(action.response, state);
    case VIDEO_DETAILS[SUCCESS]:
      return reduceVideoDetails(action.response, state);
    default:
      return state;
  }
};

const reduceFetchMostPopularVideos = (response, prevState) => {
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

export const getMostPopularVideos = createSelector(
  state => state.videos.byId,
  state => state.videos.mostPopular,
  (videosById, mostPopular) => {
    if (!mostPopular || !mostPopular.items) {
      return [];
    }
    return mostPopular.items.map(videoId => videosById[videoId]);
  }
);

const reduceFetchVideoCategories = (response, prevState) => {
  const categoryMapping = response.items.reduce((accumulator, category) => {
    accumulator[category.id] = category.snippet.title;
    return accumulator;
  }, {});
  return {
    ...prevState,
    categories: categoryMapping
  };
};

export const getVideoCategoryIds = createSelector(
  state => state.videos.categories,
  categories => Object.keys(categories || {})
);

const reduceFetchMostPopularVideosByCategory = (
  responses,
  categories,
  prevState
) => {
  let videoMap = {};
  let byCategoryMap = {};

  responses.forEach((response, index) => {
    if (response.status === 400) {
      return;
    }

    const categoryId = categories[index];
    const { byId, byCategory } = groupVideosByIdAndCategory(response.result);
    videoMap = { ...videoMap, ...byId };
    byCategoryMap[categoryId] = byCategory;
  });

  return {
    ...prevState,
    byId: { ...prevState.byId, ...videoMap },
    byCategory: { ...prevState.byCategory, ...byCategoryMap }
  };
};

const groupVideosByIdAndCategory = response => {
  const videos = response.items;
  const byId = {};
  const byCategory = {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    items: []
  };

  videos.forEach(video => {
    byId[video.id] = video;

    const items = byCategory.items;
    if (items && items.length) {
      items.push(video.id);
    } else {
      byCategory.items = [video.id];
    }
  });

  return { byId, byCategory };
};

export const getVideosByCategory = createSelector(
  state => state.videos.byCategory,
  state => state.videos.byId,
  state => state.videos.categories,
  (videosByCategory, videosById, categories) => {
    return Object.keys(videosByCategory || {}).reduce(
      (accumulator, categoryId) => {
        const videoIds = videosByCategory[categoryId].items;
        const categoryTitle = categories[categoryId];
        accumulator[categoryTitle] = videoIds.map(
          videoId => videosById[videoId]
        );
        return accumulator;
      },
      {}
    );
  }
);

export const videoCategoriesLoaded = createSelector(
  state => state.videos.categories,
  categories => Object.keys(categories || {}).length !== 0
);

export const videosByCategoryLoaded = createSelector(
  state => state.videos.byCategory,
  videosByCategory => Object.keys(videosByCategory || {}).length
);

const reduceWatchDetails = (responses, prevState) => {
  const videoDetailResponse = responses.find(
    r => r.result.kind === VIDEO_LIST_RESPONSE
  );
  const video = videoDetailResponse.result.items[0];
  const relatedEntry = reduceRelatedVideosRequest(responses);

  return {
    ...prevState,
    byId: {
      ...prevState.byId,
      [video.id]: video
    },
    related: {
      ...prevState.related,
      [video.id]: relatedEntry
    }
  };
};

export const getVideoById = (state, videoId) => {
  return state.videos.byId[videoId];
};

const reduceRelatedVideosRequest = responses => {
  const relatedVideosResponse = responses.find(
    r => r.result.kind === SEARCH_LIST_RESPONSE
  );
  const { pageInfo, items, nextPageToken } = relatedVideosResponse.result;
  const relatedVideoIds = items.map(video => video.id);

  return {
    totalResults: pageInfo.totalResults,
    nextPageToken,
    items: relatedVideoIds
  };
};

const reduceVideoDetails = (responses, prevState) => {
  const videoResponses = responses.filter(
    response => response.result.kind === VIDEO_LIST_RESPONSE
  );
  const parsedVideos = videoResponses.reduce((videoMap, response) => {
    const video = response.result.items ? response.result.items[0] : null;
    if (!video) {
      return videoMap;
    }
    videoMap[video.id] = video;
    return videoMap;
  }, {});

  return {
    ...prevState,
    byId: { ...prevState.byId, ...parsedVideos }
  };
};

const getRelatedVideoIds = (state, videoId) => {
  const related = state.videos.related ? state.videos.related[videoId] : null;
  return related ? related.items : [];
};

export const getRelatedVideos = createSelector(
  getRelatedVideoIds,
  state => state.videos.byId,
  (relatedVideoIds, videos) => {
    if (relatedVideoIds) {
      const relatedVideos = relatedVideoIds
        .map(videoId => videos[videoId.videoId])
        .filter(video => video);
      return relatedVideos;
    }
    return [];
  }
);

export const getChannelId = (state, location, name) => {
  const videoId = getSearchParam(location, name);
  const video = state.videos.byId[videoId];
  if (video) {
    return video.snippet.channelId;
  }
  return null;
};
