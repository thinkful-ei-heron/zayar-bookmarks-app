import store from './store';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/reif';

const getItems = function () {
  return apiFetch(`${BASE_URL}/items`);
};

const createItem = function (name) {
  let newItem = JSON.stringify({
    name
  });
  return apiFetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newItem
  });
};

const updateItem = function (id, updateData) {
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
};

const deleteItem = function (id) {
  return apiFetch(`${BASE_URL}/items/${id}`, {
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
      return responseCheck(resp);
      // return resp;
    })
    .catch(error => {
      console.log(error);
      // document.getElementById('error-container').innerHTML = '';
      // store.errors.error = resp;
      // document.getElementById('error-container').innerHTML = (`Error: ${resp}`);
    });


  // .then(resp => responseCheck(resp));
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};