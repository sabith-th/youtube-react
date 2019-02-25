import { all, call, fork, put, take } from "redux-saga/effects";
import { REQUEST } from "../actions";
import * as watchActions from "../actions/watch";
import {
  buildRelatedVideosRequest,
  buildVideoDetailRequest
} from "../api/youtube-api";
import { SEARCH_LIST_RESPONSE } from "../api/youtube-response-types";

export function* watchWatchDetails() {
  while (true) {
    const { videoId } = yield take(watchActions.WATCH_DETAILS[REQUEST]);
    yield fork(fetchWatchDetails, videoId);
  }
}

export function* fetchWatchDetails(videoId) {
  let requests = [
    buildVideoDetailRequest.bind(null, videoId),
    buildRelatedVideosRequest.bind(null, videoId)
  ];
  try {
    const responses = yield all(requests.map(fn => call(fn)));
    yield put(watchActions.details.success(responses));
    yield call(fetchVideoDetails, responses);
  } catch (error) {
    yield put(watchActions.details.failure(error));
  }
}

function* fetchVideoDetails(responses) {
  const searchListResponse = responses.find(
    response => response.result.kind === SEARCH_LIST_RESPONSE
  );
  const relatedVideoIds = searchListResponse.result.items.map(
    relatedVideo => relatedVideo.id.videoId
  );

  const requests = relatedVideoIds.map(relatedVideoId => {
    return buildVideoDetailRequest.bind(null, relatedVideoId);
  });

  try {
    const responses = yield all(requests.map(fn => call(fn)));
    yield put(watchActions.videoDetails.success(responses));
  } catch (error) {
    yield put(watchActions.videoDetails.failure(error));
  }
}
