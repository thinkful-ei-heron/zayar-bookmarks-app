import bookmarks from './bookmarks.js'

const startApp = function () {
    bookmarks.syncApi();
    bookmarks.handleEvents();
    bookmarks.render();
}

$(startApp)