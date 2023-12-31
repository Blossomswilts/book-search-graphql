// save book data for a logged in user
export const saveBook = (bookData, token) => {
    return fetch("/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
    });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
    return fetch(`/api/users/books/${bookId}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
