document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const booksContainer = document.getElementById('books-container');
    const readingListContainer = document.getElementById('reading-list-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const genreFilter = document.getElementById('genre-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const addBookForm = document.getElementById('add-book-form');
    const homeLink = document.getElementById('home-link');
    const readingListLink = document.getElementById('reading-list-link');
    const addBookLink = document.getElementById('add-book-link');
    const booksSection = document.getElementById('books-section');
    const readingListSection = document.getElementById('reading-list-section');
    const addBookSection = document.getElementById('add-book-section');

    // Sample book data
    let books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            year: 1925,
            description: "A story of wealth, love, and the American Dream in the 1920s.",
            coverUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
            available: true
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            year: 1960,
            description: "A powerful story of racial injustice and moral growth in the American South.",
            coverUrl: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
            available: true
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            genre: "Science Fiction",
            year: 1949,
            description: "A dystopian novel about totalitarianism and surveillance.",
            coverUrl: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
            available: false
        },
        {
            id: 4,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            genre: "Fantasy",
            year: 1937,
            description: "A fantasy novel about the adventures of Bilbo Baggins.",
            coverUrl: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
            available: true
        },
        {
            id: 5,
            title: "Sapiens: A Brief History of Humankind",
            author: "Yuval Noah Harari",
            genre: "Non-Fiction",
            year: 2011,
            description: "An exploration of the history of Homo sapiens.",
            coverUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg",
            available: true
        },
        {
            id: 6,
            title: "The Diary of a Young Girl",
            author: "Anne Frank",
            genre: "Biography",
            year: 1947,
            description: "The diary of Anne Frank, a Jewish girl hiding during WWII.",
            coverUrl: "https://m.media-amazon.com/images/I/61+J24WcjbL._AC_UF1000,1000_QL80_.jpg",
            available: false
        }
    ];

    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];

    // Display books
    function displayBooks(booksToDisplay = books) {
        booksContainer.innerHTML = '';
        
        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            bookCard.innerHTML = `
                <div class="book-cover" style="background-image: url('${book.coverUrl || 'https://via.placeholder.com/250x350?text=No+Cover'}')"></div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>by ${book.author}</p>
                    <p>${book.genre} • ${book.year}</p>
                    <p class="availability ${book.available ? 'available' : 'unavailable'}">
                        ${book.available ? 'Available' : 'Checked Out'}
                    </p>
                    <div class="book-actions">
                        <button class="btn btn-primary" onclick="addToReadingList(${book.id})">
                            ${readingList.includes(book.id) ? 'In List' : 'Add to List'}
                        </button>
                        <button class="btn ${book.available ? 'btn-success' : 'btn-danger'}" onclick="toggleAvailability(${book.id})">
                            ${book.available ? 'Check Out' : 'Return'}
                        </button>
                    </div>
                </div>
            `;
            
            booksContainer.appendChild(bookCard);
        });
    }

    // Display reading list
    function displayReadingList() {
        readingListContainer.innerHTML = '';
        
        if (readingList.length === 0) {
            readingListContainer.innerHTML = '<p>Your reading list is empty.</p>';
            return;
        }
        
        const readingListBooks = books.filter(book => readingList.includes(book.id));
        
        readingListBooks.forEach(book => {
            const listItem = document.createElement('div');
            listItem.className = 'reading-list-item';
            
            listItem.innerHTML = `
                <img src="${book.coverUrl || 'https://via.placeholder.com/60x80?text=No+Cover'}" alt="${book.title}">
                <div class="reading-list-item-info">
                    <h3>${book.title}</h3>
                    <p>by ${book.author}</p>
                    <p>${book.genre} • ${book.year}</p>
                </div>
                <div class="reading-list-item-actions">
                    <button class="btn btn-danger" onclick="removeFromReadingList(${book.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            readingListContainer.appendChild(listItem);
        });
    }

    // Add to reading list
    window.addToReadingList = function(bookId) {
        if (!readingList.includes(bookId)) {
            readingList.push(bookId);
            localStorage.setItem('readingList', JSON.stringify(readingList));
            displayBooks();
            if (!readingListSection.classList.contains('hidden')) {
                displayReadingList();
            }
        }
    }

    // Remove from reading list
    window.removeFromReadingList = function(bookId) {
        readingList = readingList.filter(id => id !== bookId);
        localStorage.setItem('readingList', JSON.stringify(readingList));
        displayBooks();
        displayReadingList();
    }

    // Toggle book availability
    window.toggleAvailability = function(bookId) {
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            books[bookIndex].available = !books[bookIndex].available;
            displayBooks();
        }
    }

    // Filter books
    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const genre = genreFilter.value;
        const availability = availabilityFilter.value;
        
        let filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm);
            const matchesGenre = genre === '' || book.genre === genre;
            const matchesAvailability = availability === 'all' || 
                                      (availability === 'available' && book.available) || 
                                      (availability === 'checked-out' && !book.available);
            
            return matchesSearch && matchesGenre && matchesAvailability;
        });
        
        displayBooks(filteredBooks);
    }

    // Add new book
    addBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            year: parseInt(document.getElementById('year').value),
            description: document.getElementById('description').value,
            coverUrl: document.getElementById('cover-url').value || '',
            available: true
        };
        
        books.unshift(newBook);
        addBookForm.reset();
        showSection('books-section');
        displayBooks();
    });

    // Navigation
    function showSection(sectionId) {
        booksSection.classList.add('hidden');
        readingListSection.classList.add('hidden');
        addBookSection.classList.add('hidden');
        
        homeLink.classList.remove('active');
        readingListLink.classList.remove('active');
        addBookLink.classList.remove('active');
        
        if (sectionId === 'books-section') {
            booksSection.classList.remove('hidden');
            homeLink.classList.add('active');
            filterBooks();
        } else if (sectionId === 'reading-list-section') {
            readingListSection.classList.remove('hidden');
            readingListLink.classList.add('active');
            displayReadingList();
        } else if (sectionId === 'add-book-section') {
            addBookSection.classList.remove('hidden');
            addBookLink.classList.add('active');
        }
    }

    // Event listeners
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('books-section');
    });

    readingListLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('reading-list-section');
    });

    addBookLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('add-book-section');
    });

    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterBooks();
        }
    });

    genreFilter.addEventListener('change', filterBooks);
    availabilityFilter.addEventListener('change', filterBooks);

    // Initialize
    showSection('books-section');
});