import Axios from 'axios';
const API_HOST_URL = "https://images-api.nasa.gov";
export class ApiService {

  constructor() {
    this._headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		};
  }
  searchNasaMedia = (query) => {
    return Axios.get(`${API_HOST_URL}/search`, { params: {q: encodeURIComponent(query)},  headers: this._headers})
    .then(response => {
      if (response.status === 200 && response.data && response.data.collection && response.data.collection.items) {
        return response.data.collection.items;
      } 
    })
    .catch(error => console.log(`Failed to search for NASA media `, error));
  }
}

export const apiService = new ApiService();
