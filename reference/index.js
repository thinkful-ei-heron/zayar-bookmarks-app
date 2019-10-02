
import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api.js';

import shoppingList from './shopping-list';
import store from './store';

const main = function () {
  api.getItems()
    .then(res => res.json())
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      shoppingList.render();
    });

  // console.log(store.items);
  // // api.deleteItem("ck16k6phi000i0k2o1pxkc2k7");
  // // console.log(api.getItems());

  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);
