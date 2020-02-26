export class DataService {

  //  helper function to transform array of data from API response
  //  to a map with key = nasa_id 
  //  Also, added boolean field to mark if an item is in personal collection
  //  and if an item is marked as Liked
  processSearchResults = ({ searchResults, personalCollectionMap }) => {
    if (!searchResults || searchResults.length === 0) { return []; }
    return searchResults.reduce((processedResults, item) => {
      const data = item['data'] && item['data'].length > 0 ? item['data'][0] : null;
      const links = item['links'] || []
      if (data) {
        const id = data['nasa_id'] || null;
        if (id) {
          const isInCollection = personalCollectionMap && personalCollectionMap[id];
          processedResults = {
            ...processedResults,
            [id]: {
              ...data,
              links: links,
              liked: false,
              isInCollection
            }
          }

        }
      }
      return processedResults;
    }, {})
  }

  //  helper function to get and set data from/to local storage
  setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify({ data }));
  }

  getLocalStorageData = (key) => {
    const item = localStorage.getItem(key);
    if (!item) {
      return {};
    }
    try {
      const { data } = JSON.parse(item);
      return data;
    } catch (e) {
      return {};
    }
  }

}

export const dataService = new DataService();
