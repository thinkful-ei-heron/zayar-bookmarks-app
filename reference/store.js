// import item from './item';

const items = [];
let errors = { error: false };
let hideCheckeditems = false;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  if (item.name) {
    console.log(item);
    this.items.push(item);
  } else {
    throw new Error(item.message)
  }
};

const findAndUpdate = function (id, newData) {
  let updatedItem = this.findById(id);
  Object.assign(updatedItem, newData);
};

const findAndDelete = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

export default {
  items,
  hideCheckeditems,
  findById,
  addItem,
  findAndUpdate,
  findAndDelete,
  toggleCheckedFilter,
  errors
};