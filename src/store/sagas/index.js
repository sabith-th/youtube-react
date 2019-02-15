import { all, call, fork, put } from "redux-saga/effects";
import { watchMostPopularVideos, watchVideoCategories } from "./video";

export default function*() {
  yield all([fork(watchMostPopularVideos), fork(watchVideoCategories)]);
}

export function* fetchEntity(request, entity, ...args) {
  try {
    const response = yield call(request);
    yield put(entity.success(response.result, ...args));
  } catch (error) {
    yield put(entity.failure(error, ...args));
  }
}
