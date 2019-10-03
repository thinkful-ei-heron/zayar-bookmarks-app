import store from './store.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/zayar/bookmarks';

const parseJson = function (response) {
  return response.json();
};

const processStatus = function (response) {
  if (response.ok) {
    return response;
  } else {
    return Promise.reject(new Error(`API Error code: ${response.status}`))
  }
};


const getBookmarks = function () {
  return apiFetch(`${BASE_URL}/`)
    .then(response => parseJson(response));
};

const createBookmark = function (formdata) {
  return apiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formdata)
  })
    .then(resp => parseJson(resp))
    .catch(err => {
      return Promise.reject(Error(err));
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


const apiFetch = function (...args) {
  return fetch(...args)
    .then(resp => processStatus(resp));
    };

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  apiFetch
};