import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8qnnJxexNllygOd8LG3SxtbeIopacUQeV1zi9YEuOAdvDRa19v0CXeJDYq1upaZ8';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const breedEndPoint = 'breeds';
const searchEndPoint = 'images/search';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}${breedEndPoint}`).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${searchEndPoint}?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
