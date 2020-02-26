import { call, put, takeLatest, select } from 'redux-saga/effects'
import { apiService } from '../services/apiService';
import { dataService } from '../services/dataService';

export const getStoreData = (state) => state.itemStore;

export default function* sagas() {
  yield takeLatest("SEARCH_NASA_MEDIA", searchNasaMedia);
  yield takeLatest("ADD_MEDIA_TO_COLLECTION", addMediaToCollection);
  yield takeLatest("REMOVE_MEDIA_FROM_COLLECTION", removeMediaFromCollection);
  yield takeLatest("TOGGLE_LIKE_MEDIA", toggleLikeMedia);
  yield takeLatest("UPDATE_MEDIA", updateMedia);
  yield takeLatest("UPDATE_LOCAL_STORAGE_DATA", updateLocalStorageData);
}

function* searchNasaMedia(action) {
  try {
    yield put({ type: "START_LOADING", loadingAction: "searchNasaMedia" });
    const searchResults = yield call(apiService.searchNasaMedia, action.query);
    const { personalCollectionMap } = yield select(getStoreData);
    const processedData = yield call(dataService.processSearchResults, {searchResults, personalCollectionMap});
    yield put({ type: "SEARCH_NASA_IMAGE_SUCCESSFUL", processedData });
  } catch (error) {
    yield put({ type: "SEARCH_NASA_IMAGE_FAILED", error })
  }
}

function* addMediaToCollection(action) {
  try {
    yield put({ type: "START_LOADING", loadingAction: "addToCollection" });
    const { media } = action;
    yield put({ type: "ADD_MEDIA_TO_COLLECTION_SUCCESSFUL", media });
    yield put({ type: "UPDATE_LOCAL_STORAGE_DATA"});
  } catch (error) {
    yield put({ type: "ADD_MEDIA_TO_COLLECTION_FAILED", error })
  }
}

function* removeMediaFromCollection(action) {
  try {
    yield put({ type: "START_LOADING", loadingAction: "removeFromCollection" });
    const { mediaId } = action;
    yield put({ type: "REMOVE_MEDIA_FROM_COLLECTION_SUCCESSFUL", mediaId });
    yield put({ type: "UPDATE_LOCAL_STORAGE_DATA"});
  } catch (error) {
    yield put({ type: "REMOVE_MEDIA_FROM_COLLECTION_FAILED", error })
  }
}

function* toggleLikeMedia(action) {
  try {
    yield put({ type: "START_LOADING", loadingAction: "likeMedia" });
    const { mediaId } = action;
    yield put({ type: "TOGGLE_LIKE_MEDIA_SUCCESSFUL", mediaId });
    yield put({ type: "UPDATE_LOCAL_STORAGE_DATA"});
  } catch (error) {
    yield put({ type: "TOGGLE_LIKE_MEDIA_FAILED", error })
  }
}

function* updateMedia(action) {
  try {
    yield put({ type: "START_LOADING", loadingAction: "updateMedia" });
    const { media } = action;
    yield put({ type: "UPDATE_MEDIA_SUCCESSFUL", media });
    yield put({ type: "UPDATE_LOCAL_STORAGE_DATA"});
  } catch (error) {
    yield put({ type: "UPDATE_MEDIA_FAILED", error })
  }
}

function* updateLocalStorageData() {
  try {
    const { personalCollectionMap } = yield select(getStoreData);
    yield call(dataService.setLocalStorageData, 'personal-collection', personalCollectionMap);
  } catch (error) {
    console.log('failed to update local storage data ', error);
  }
}
