import api from './api.js';
import store from './store.js';

//add filter dropdown

const syncApi = function () {
    return api.getBookmarks()
        .then(bookmarks => {
            bookmarks.forEach(bookmark => {
                store.addItem(bookmark);
            });
        })
        .catch(err => {
            store.setError(err);
            render();
        });
}

/////////////   DOM Rendering Methods   ////////////

const render = function () {
    //store.adding
    //store.error
    //store.filter
    //store.items
    renderBookmarks();
    if (store.error) {
        renderError();
        store.setError(null);
    }
    if (store.adding) {
        renderCreate();
        store.toggleAdding();
    } else {
        renderMenu();
    }
    
}

const renderBookmarks = function () {
    let items = [...store.items];
    if (store.filter) {
        items = store.items.filter(item => item.rating >= store.filter);
    }
    let html = generateBookmarksHtml(items);
    $('.bookmarks ul').html(html);
}

const renderMenu = function () {
    //store.filter
    //store.adding
    let html = generateMenuHtml();
    $('.menu').html(html);
}

const renderError = function () {
    let html = generateErrorHtml(store.error);
    $('.errors').html(html);
}

const renderCreate = function () {
    let html = generateCreateHtml();
    $('.menu').html(html);
}

///////////////       Event Handlers       ////////////////

const handleEvents = function () {
    handleAddingMenu();
    handleCreateBookmark();
    handleExpandCollapse();
    handleDelete();
    handleFilter();
}

const handleFilter = function () {
    $('.menu').on('change', '.js-filter', event => {
        event.preventDefault();
        store.filter = $('select option:selected').val();
        renderBookmarks();
    })     
}

const handleDelete = function () {
    $('.bookmarks').on('click', '.js-delete', event => {
        let itemId = $(event.currentTarget).closest('li').attr('data-id');
        store.findAndDelete(itemId);
        api.deleteBookmark(itemId);
        renderBookmarks();
    })
}

const handleExpandCollapse = function () {
    $('.bookmarks').on('click', '.js-expand', event => {
        let itemId = $(event.currentTarget).closest('li').attr('data-id');
        console.log(itemId);
        let item = store.findById(itemId);
        item.expanded = true;
        renderBookmarks();
    })
    $('.bookmarks').on('click', '.js-collapse', event => {
        let itemId = $(event.currentTarget).closest('li').attr('data-id');
        console.log(itemId);
        let item = store.findById(itemId);
        item.expanded = false;
        renderBookmarks();
    })
}

const handleCreateBookmark = function () {
    $('.menu').on('submit', '.js-create', event => {
        event.preventDefault();
        let title = $('.js-title').val()
        let url = $('.js-url').val()
        let desc = $('.js-description').val()
        let rating = $('input[type=radio][name=rating]:checked').val()
        let formdata = {
            title,
            url,
            desc,
            rating
        }
        console.log(formdata);
        api.createBookmark(formdata)
            .then(jsonResponse => store.addItem(jsonResponse))
            .catch(err => {
                store.setError(err);
                renderError();
            });
    });
    $('.menu').on('click', '.js-create-cancel', event => {
        store.adding = false;
        renderMenu();
    })
}

const handleAddingMenu = function () {
    //store.
    $('.menu').on('click', '.js-new', event => {
        event.preventDefault();
        store.adding = true;
        renderCreate();
    })    
}

//handleExpand
//handleAddingMenu
//handleCreateBookmark
//handleCollapse
//handleUpdate



///////////////     HTML generator methods     /////////////////////

const generateCreateHtml = function () {
    return `<form class="js-create">
                <h2>Create a bookmark</h2>
                <fieldset>
                    <div>
                        <label for="js-title">Title:</label>
                        <input id="js-title" class="js-title" name="title" type="text" placeholder="Enter Website Title..." required>
                    </div>
                    <div>
                        <label for="js-url">URL:</label>
                        <input id="js-url" class="js-url" name="url" type="text" placeholder="Enter URL..." required>
                    </div>
                    <div>
                        <label for="js-description">Description:</label>
                        <input id="js-description" class="js-description" name="desc" type="text" placeholder="Optional Description...">
                    </div>
                </fieldset>
                <fieldset>
                    <legend for="js-rating">Optional Rating:</legend>
                    <div>
                        <label class="rating-label"><i class="fas fa-star"></i><input type="radio" name="rating" value="1"></label>
                        <label class="rating-label"><i class="fas fa-star"></i><input type="radio" name="rating" value="2"></label>
                        <label class="rating-label"><i class="fas fa-star"></i><input type="radio" name="rating" value="3"></label>
                        <label class="rating-label"><i class="fas fa-star"></i><input type="radio" name="rating" value="4"></label>
                        <label class="rating-label"><i class="fas fa-star"></i><input type="radio" name="rating" value="5"></label>
                    </div>
                </fieldset>
                <button class="js-create-submit btn" type="submit">Create</button>
                <button class="js-create-reset btn" type="reset">Reset</button>
                <button class="js-create-cancel btn" type="button">Cancel</button>
            </form>`
}

const generateBookmarksHtml = function (items) {
    let html = items.map(generateBookmarkItemHtml);
    return html;

};

const generateBookmarkItemHtml = function(item) {
    let rating = [];
    for (let i = 0; i < item.rating; i++) {
        rating.push(`<button class="btn" name="rating" type="submit" value="${i + 1}"><i class="fas fa-star"></i></button>`);
    }
    while (rating.length < 5) {
        rating.push(`<button class="btn" name="rating" type="submit" value="${rating.length+1}"><i class="far fa-star"></i></button>`);
    }
    let ratingHtml = rating.join('');
    if (!item.expanded) {
        return `<li data-id="${item.id}" class="bookmark-item">
                    <form class="js-edit">
                        <div class="bookmark-minimized">
                            <button type="button" class="js-expand btn">${item.title}</button>
                        </div>
                        <div class="bookmark-rating-minimized">
                            ${ratingHtml}
                        </div>
                    </form>
                </li>`
    } else if (item.expanded) {
        return `<li data-id="${item.id}" class="bookmark-item">
                    <form class="js-edit">
                        <div class="bookmark-expanded">
                            <h3>${item.title}</h3>
                            <input class="description-edit" name="desc" type="text" placeholder="${item.desc}">
                            <p><a href="${item.url}" alt="url">Visit Site</a></p>
                            <div class="bookmark-rating">
                                ${ratingHtml}
                            </div>
                        </div>
                        <button class="js-collapse btn" type="button"><i class="fas fa-caret-square-up fa-2x"></i></button>
                        <button class="js-delete btn" type="button"><i class="fas fa-trash fa-2x"></i></button>
                    </form>
                </li>`
    }};


const generateErrorHtml = function (error) {
    return `<h5 class="js-errors">${error}</h5>`
}

const generateMenuHtml = function () {
    return `<form class="js-menu">
                <button class="js-new btn"><i class="far fa-plus-square"></i>New</button>
                <button class="btn" type="button"><i class="fas fa-filter"></i><i class="fas fa-star"></i>Filter by Rating
                </button>
                <select class="js-filter">
                    <option value="0">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </form>`
}

export default {
    render,
    syncApi,
    handleEvents
}