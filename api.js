import store from './store';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/zayar/bookmarks';

const parseJson = function (response) {
  return response.json();
};

const processStatus = function (response) {// process status
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(`API Error code: ${response.status}`))
  }
};


const getBookmarks = function () {
  return apiFetch(`${BASE_URL}/`);
};

const createBookmark = function (
  title,
  url,
  description = 'Click to edit description',
  rating = 1
) {
  let newItem = JSON.stringify({
    title,
    url,
    description,
    rating
  });
  return apiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newItem
  });
};

const updateBookmark = function (id, updateData) {
  if (updateData.title && updateData.url) {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  } else {
    throw new Error('Must provide a title and URL');
  }
};

const deleteBookmark = function (id) {
  if (!id) {
    throw new Error(`Couldn't find bookmark to delete`);
  }
  return apiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
};

const responseCheck = function (res) {
  if (!res.ok) {
    store.errors.error = res.status;
    document.getElementById('error-container').innerHTML = (`Error: ${store.errors.error}`);
    return Promise.reject(`Error code: ${store.errors.error}`);
  }
  document.getElementById('error-container').innerHTML = '';
  return res;
};

const apiFetch = function (...args) {
  return fetch(...args)
    .then(resp => {
      return processStatus(resp);
    });
    };

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  parseJson
};