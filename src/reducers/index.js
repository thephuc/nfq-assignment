import { dataService } from "../services/dataService";

export const initialState = {
  loading: {
    searchNasaMedia: false,
    addToCollection: false,
    removeFromCollection: false,
    likeMedia: false,
    updateMedia: false
  },
  searchResultMap: {},
  personalCollectionMap: dataService.getLocalStorageData('personal-collection') || {},
  error: {
    failed: false,
    message: null
  }
};

const ACTION_HANDLERS = {
  "START_LOADING": (state, sagaData) => {
    return {
      ...state,
      loading: { ...state.loading, [sagaData.loadingAction]: true }
    }
  },

  "SEARCH_NASA_IMAGE_SUCCESSFUL": (state, sagaData) => {
    const { processedData } = sagaData;
    return {
      ...state,
      searchResultMap: processedData || {},
      loading: { ...state.loading, searchNasaMedia: false }
    }
  },

  "SEARCH_NASA_IMAGE_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      searchResultMap: initialState.searchResultMap,
      loading: { ...state.loading, searchNasaMedia: false },
      error: { failed: true, message: error }
    }
  },
  "ADD_MEDIA_TO_COLLECTION_SUCCESSFUL": (state, sagaData) => {
    const { media } = sagaData;
    const { nasa_id } = media;
    const newResultMap = { ...state.searchResultMap };
    if (newResultMap[nasa_id]) {
      newResultMap[nasa_id].isInCollection = true;
    }
    return {
      ...state,
      personalCollectionMap: {
        ...state.personalCollectionMap,
        [nasa_id]: media
      },
      searchResultMap: newResultMap,
      loading: {
        ...state.loading,
        addToCollection: false
      }
    }
  },
  "ADD_MEDIA_TO_COLLECTION_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      loading: { ...state.loading, addToCollection: false },
      error: { failed: true, message: error }
    }
  },
  "REMOVE_MEDIA_FROM_COLLECTION_SUCCESSFUL": (state, sagaData) => {
    const { mediaId } = sagaData;
    const newCollectionMap = { ...state.personalCollectionMap };
    if (newCollectionMap[mediaId]) {
      delete newCollectionMap[mediaId];
    }
    return {
      ...state,
      personalCollectionMap: newCollectionMap,
      loading: {
        ...state.loading,
        removeFromCollection: false
      }
    }
  },
  "REMOVE_MEDIA_FROM_COLLECTION_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      loading: { ...state.loading, removeFromCollection: false },
      error: { failed: true, message: error }
    }
  },
  "TOGGLE_LIKE_MEDIA_SUCCESSFUL": (state, sagaData) => {
    const { mediaId } = sagaData;
    const newCollectionMap = { ...state.personalCollectionMap };
    if (newCollectionMap[mediaId]) {
      newCollectionMap[mediaId].liked = !newCollectionMap[mediaId].liked;
    }
    return {
      ...state,
      personalCollectionMap: newCollectionMap,
      loading: {
        ...state.loading,
        likeMedia: false
      }
    }
  },
  "TOGGLE_LIKE_MEDIA_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      loading: { ...state.loading, likeMedia: false },
      error: { failed: true, message: error }
    }
  },
  "UPDATE_MEDIA_SUCCESSFUL": (state, sagaData) => {
    const { media } = sagaData;
    const { nasa_id } = media;
    return {
      ...state,
      personalCollectionMap: {
        ...state.personalCollectionMap,
        [nasa_id]: media
      },
      loading: {
        ...state.loading,
        updateMedia: false
      }
    }
  },
  "UPDATE_MEDIA_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      loading: { ...state.loading, updateMedia: false },
      error: { failed: true, message: error }
    }
  },

};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};

export default reducer;
