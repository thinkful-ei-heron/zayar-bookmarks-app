import bookmarks from './bookmarks.js'

const store = {
  items: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      desc: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      desc: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: null
};
const items = [];
let adding = false;
let error = null;
let filter = null;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  console.log(item);
  if (item.title) {
    let newitem = {};
    Object.assign(newitem, item);
    newitem.expanded = false;
    this.items.push(newitem);
    bookmarks.render();
  } else {
    throw new Error('Not a valid item');
  }
};

const findAndUpdate = function (id, newData) {
  let updatedItem = this.findById(id);
  Object.assign(updatedItem, newData);
};

const findAndDelete = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const setRatingFilter = function (rating=null) {
  this.filter = rating;
};

const toggleAdding = function () {
  this.adding = !this.adding;
}

const setError = function (error = null) {
  this.error = error;
}

export default {
  items,
  adding,
  error,
  filter,
  findById,
  addItem,
  findAndUpdate,
  findAndDelete,
  setRatingFilter,
  toggleAdding,
  setError
};