//Declaring variables
const triggerFormButton = document.getElementById("trigger-form-button");
const bookFormContainer = document.getElementById("book-form-container");
const bookForm = document.getElementById("book-form");
const newBookContainer = document.getElementById("new-book-container");
const archivedBooksSection = document.getElementById("archived-books");
const archivedBookContainer = document.getElementById("archived-book-container");
const searchBar = document.getElementById("search-bar");
const filteredBooksSection = document.getElementById("filtered-books");
const searchResults = document.getElementById("search-results-container");
const textHeader = document.getElementById("added-books-header");

//Book covers
const coverImages = [
    "/assets/book-cover-one.jpg", "/assets/book-cover-two.jpg", "/assets/book-cover-three.jpg", "/assets/book-cover-four.jpg", "/assets/book-cover-five.jpg", "/assets/book-cover-six.jpg", "/assets/book-cover-seven.jpg", "/assets/book-cover-eight.jpg", "/assets/book-cover-nine.jpg", "/assets/book-cover-ten.jpg"
];


//Storing added books
let addedBooks = getBooks();
if (addedBooks.length !== 0) 
    displayBooks(addedBooks);
let entryIds = 0;

//Event Listeners
//Making the book form visible
triggerFormButton. addEventListener("click", () => {
        bookFormContainer.style.display = "block";
});

//Adding a new book
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    const cover = getRandomBookCover();
    const title = formData.get("title");
    const author = formData.get("author");
    const rating = formData.get("rating");
    const notes = formData.get("notes");

    const newBook = {cover, title, author, rating, notes};
    
    if (addBook(addedBooks, newBook)) {
        bookForm.reset();
        bookFormContainer.style.display = "none";
    } else {
        document.getElementById("error-message").setAttribute("style", "display: block;");
        document.getElementById("error-message").textContent = "A book with the same title has already been added."
    }
});

//Filtering the books
searchBar.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        filteredBooksSection.style.display = "block";
        textHeader.innerHTML = "Here is what you have been looking for all along:"
        const query = event.target.value;
        const filteredBooks = filterBooks(query, addedBooks);
        displayBooks(filteredBooks);
    }
});  

//Functions
//Saving books to local storage
function saveBooks(booksArray) {
    const booksJSON = JSON.stringify(booksArray);
    localStorage.setItem("books", booksJSON);
}

//Getting books from local storage
function getBooks() {
    const booksJSON = localStorage.getItem("books");
    return booksJSON ? JSON.parse(booksJSON) : [];
}

//Comparing books
function isBookTitleUnique (addedBooks, title) {
    return !addedBooks.some(newBook => newBook.title === title); 
};

//Adding a book to the array
function addBook(addedBooks, newBook) {
    if (isBookTitleUnique(addedBooks, newBook.title)) {
        addedBooks.push(newBook);
        saveBooks(addedBooks);
        displayBooks(addedBooks);
        return true;
    } else {
        return false;
    }
};

//Displaying the new book
function displayBooks(books) {

    archivedBookContainer.innerHTML = "";

    books.forEach ((book, index) => {

        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        const coverContainer = document.createElement("div");
        coverContainer.classList.add("book-cover-container");
        coverContainer.setAttribute("width", "400px");

        const cover = document.createElement("img");
        cover.src = book.cover; 
        cover.setAttribute("alt", "Book Cover");
        cover.setAttribute("height", "400px");
        cover.setAttribute("width", "250px");

        const bookDetailsContainer = document.createElement("div");
        bookDetailsContainer.classList.add("book-details-container");

        const title = document.createElement("p");
        title.innerHTML = `${book.title}`;
        title.classList.add("book-title");
        const author = document.createElement("p");
        author.innerHTML = `${book.author}`;
        author.classList.add("book-author");
        const rating = document.createElement("p");
        rating.innerHTML = `${book.rating}`;
        rating.classList.add("book-rating");
        const notes = document.createElement("p");
        notes.innerHTML = `${book.notes}`;
        notes.classList.add("book-notes");

        const bookButtonsContainer = document.createElement("div");
        bookButtonsContainer.classList.add("book-buttons-container")

        const editButton = document.createElement("button");
        editButton.innerHTML = `Edit`;
        editButton.classList.add("buttons");
        const removeButton = document.createElement("button");
        removeButton.innerHTML = `Remove`;
        removeButton.classList.add("buttons");
    
        archivedBookContainer.appendChild(bookContainer);
        bookContainer.appendChild(bookDetailsContainer);
        bookContainer.appendChild(coverContainer);

        coverContainer.appendChild(cover);

        bookDetailsContainer.appendChild(title);
        bookDetailsContainer.appendChild(author);
        bookDetailsContainer.appendChild(rating);
        bookDetailsContainer.appendChild(notes);
        bookDetailsContainer.appendChild(bookButtonsContainer);

        bookButtonsContainer.appendChild(editButton);
        bookButtonsContainer.appendChild(removeButton);

        removeButton.addEventListener("click", () => removeBook(index));
        editButton.addEventListener("click", () => editBook(index, bookContainer));
        console.log(addedBooks);
        textHeader.removeAttribute("style");
    });
};

//Assigning a random cover image
function getRandomBookCover() {

    const randomIndex = Math.floor(Math.random() * coverImages.length);
    return coverImages[randomIndex];
};

//Removing a book
function removeBook(index) {

        addedBooks.splice(index, 1);
        saveBooks(addedBooks);
        displayBooks(addedBooks);
}

//Editing a book
function editBook(index, bookContainer) {

    const editForm = document.createElement("form");
    editForm.setAttribute("id", "edit-book-form");

    const editedDetailsContainer = document.createElement("div");
    editedDetailsContainer.classList.add("edited-book-container");

    const editTitleLabel = document.createElement("label");
    editTitleLabel.innerHTML = `Book Title`;
    editTitleLabel.setAttribute("for", "edited-title");
    const editTitleInput = document.createElement("input");
    editTitleInput.value = `${addedBooks[index].title}`;
    editTitleInput.setAttribute("id", "edited-title");
    editTitleInput.setAttribute("name", "edited-title");

    const editAuthorLabel = document.createElement("label");
    editAuthorLabel.innerHTML = `Author`;
    editAuthorLabel.setAttribute("for", "edited-author");
    const editAuthorInput = document.createElement("input");
    editAuthorInput.value = `${addedBooks[index].author}`;
    editAuthorInput.setAttribute("id", "edited-author");
    editAuthorInput.setAttribute("name", "edited-author");

    const editRatingLabel = document.createElement("label");
    editRatingLabel.innerHTML = `Book Rating`;
    editRatingLabel.setAttribute("for", "edited-rating");
    const editRatingInput = document.createElement("input");
    editRatingInput.value = `${addedBooks[index].rating}`;
    editRatingInput.setAttribute("id", "edited-rating");
    editRatingInput.setAttribute("name", "edited-rating");
    editRatingInput.setAttribute("type", "number");
    editRatingInput.setAttribute("min", "1");
    editRatingInput.setAttribute("max", "5");

    const editNotesLabel = document.createElement("label");
    editNotesLabel.innerHTML = `Your Notes`;
    editNotesLabel.setAttribute("for", "edited-notes");
    const editNotesInput = document.createElement("textarea");
    editNotesInput.value = `${addedBooks[index].notes}`;
    editNotesInput.setAttribute("id", "edited-notes");
    editNotesInput.setAttribute("name", "edited-notes");
    editNotesInput.setAttribute("rows", "20");
    editNotesInput.setAttribute("cols", "50");


    const editButtonsContainer = document.createElement("div");
    editButtonsContainer.classList.add("edited-buttons-container");

    const saveButton = document.createElement("button");
    saveButton.innerHTML = `Save`;
    saveButton.setAttribute("id", "save-button");
    saveButton.classList.add("buttons");
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = `Cancel`;
    cancelButton.setAttribute("id", "cancel-button");
    cancelButton.classList.add("buttons");

    editForm.appendChild(editedDetailsContainer);
    editedDetailsContainer.appendChild(editTitleLabel);
    editedDetailsContainer.appendChild(editTitleInput);
    editedDetailsContainer.appendChild(editAuthorLabel);
    editedDetailsContainer.appendChild(editAuthorInput);
    editedDetailsContainer.appendChild(editRatingLabel);
    editedDetailsContainer.appendChild(editRatingInput);
    editedDetailsContainer.appendChild(editNotesLabel);
    editedDetailsContainer.appendChild(editNotesInput);
    editedDetailsContainer.appendChild(editButtonsContainer);
    editButtonsContainer.appendChild(saveButton);
    editButtonsContainer.appendChild(cancelButton);

    const bookDetails = bookContainer.querySelector(".book-details-container");
    const paragraphs = bookDetails.querySelectorAll("p");

    for (let i= 0; i < paragraphs.length; i++) {
        if (paragraphs[i]) {
            bookDetails.removeChild(paragraphs[i]);
        };
    };

    const buttonsContainer = bookContainer.querySelector(".book-buttons-container")    
    const buttons = buttonsContainer.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i]) {
            buttonsContainer.removeChild(buttons[i]);
        };
    };

    bookDetails.appendChild(editForm);

    saveButton.addEventListener("click", () => {
        const editFormData = new FormData(editForm);

        addedBooks[index].title = editFormData.get("edited-title");
        addedBooks[index].author = editFormData.get("edited-author");
        addedBooks[index].rating = editFormData.get("edited-rating");
        addedBooks[index].notes = editFormData.get("edited-notes");
        
        saveBooks(addedBooks);
        displayBooks(addedBooks);
    });
};

//Filtering books
function filterBooks(query, addedBooks) {
    const queryWords = query
        .toLowerCase()
        .split(" ")
        .filter(word => word.trim() !== "");

    return addedBooks.filter(book => {
        const titleWords = book.title.toLowerCase().split(" ");
        const authorWords = book.author.toLowerCase().split(" ");

        return queryWords.every(queryWord => 
            titleWords.includes(queryWord) || authorWords.includes(queryWord)
        );
    });
};


