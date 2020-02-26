export const searchNasaMedia = (query) => {
  return { type: "SEARCH_NASA_MEDIA", query };
}

export const addMediaToCollection = (media) => {
  return { type: "ADD_MEDIA_TO_COLLECTION", media };
}

export const removeMediaFromCollection = (mediaId) => {
  return { type: "REMOVE_MEDIA_FROM_COLLECTION", mediaId };
}

export const toggleLikeMedia = (mediaId) => {
  return { type: "TOGGLE_LIKE_MEDIA", mediaId };
}

export const updateMedia = (media) => {
  return { type: "UPDATE_MEDIA", media}
}
