import bookmarks from './bookmarks.js'

const startApp = function () {
    bookmarks.syncApi().then(() => {
        bookmarks.render();
    });
    bookmarks.handleEvents();
}

$(startApp)