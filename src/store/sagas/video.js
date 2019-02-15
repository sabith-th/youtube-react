import { fork, take, takeEvery } from "redux-saga/effects";
import { REQUEST } from "../actions";
import * as videoActions from "../actions/video";
import * as api from "../api/youtube-api";
import { fetchEntity } from "./index";

export function* watchMostPopularVideos() {
  while (true) {
    const { amount, loadDescription, nextPageToken } = yield take(
      videoActions.MOST_POPULAR[REQUEST]
    );
    yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
  }
}

export function* fetchMostPopularVideos(
  amount,
  loadDescription,
  nextPageToken
) {
  const request = api.buildMostPopularVideosRequest.bind(
    null,
    amount,
    loadDescription,
    nextPageToken
  );
  yield fetchEntity(request, videoActions.mostPopular);
}

export const fetchVideoCategories = fetchEntity.bind(
  null,
  api.buildVideoCategoriesRequest,
  videoActions.categories
);

export function* watchVideoCategories() {
  yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fetchVideoCategories);
}
