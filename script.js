// =======================
// Book Data Initialization
// =======================
const books = [
  // 20 Custom Books (List: 'emman')
  {id: 0, title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", year: 1967, genre: "Literary", cover: "solitude.jpg", list: "emman"},
  {id: 1, title: "Wuthering Heights", author: "Emily Brontë", year: 1847, genre: "Classics", cover: "wuthering.jpg", list: "emman"},
  {id: 2, title: "Perfume: The Story of a Murderer", author: "Patrick Süskind", year: 1985, genre: "Thriller", cover: "perfume.jpg", list: "emman"},
  {id: 3, title: "Elsewhere", author: "Richard Russo", year: 2012, genre: "Memoir", cover: "elsewhere_2.jpg", list: "emman"},
  {id: 4, title: "A Letter to a Young Poet", author: "Rainer Maria Rilke", year: 1929, genre: "Poetry", cover: "letter.jpg", list: "emman"},
  {id: 5, title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: 1890, genre: "Literary", cover: "dorian.jpg", list: "emman"},
  {id: 6, title: "Elsewhere", author: "Gabrielle Zevin", year: 2005, genre: "Fiction", cover: "elsewhere_1.jpg", list: "emman"},
  {id: 7, title: "My Antonia", author: "Willa Cather", year: 1918, genre: "Literary", cover: "antonia.jpg", list: "emman"},
  {id: 8, title: "Song of Solomon", author: "Toni Morrison", year: 1977, genre: "Literary", cover: "solomon.jpg", list: "emman"},
  {id: 9, title: "The Bluest Eye", author: "Toni Morrison", year: 1970, genre: "Literary", cover: "bluest.jpg", list: "emman"},
  {id: 10, title: "Agua Viva", author: "Clarice Lispector", year: 1973, genre: "Philosophy", cover: "agua.jpg", list: "emman"},
  {id: 11, title: "The Hour of the Star", author: "Clarice Lispector", year: 1977, genre: "Literary", cover: "star.jpg", list: "emman"},
  {id: 12, title: "Lonesome Dove", author: "Larry McMurtry", year: 1985, genre: "Western", cover: "dove.jpg", list: "emman"},
  {id: 13, title: "Hard Rain Falling", author: "Don Carpenter", year: 1966, genre: "Literary", cover: "rain.jpg", list: "emman"},
  {id: 14, title: "Confusion", author: "Stefan Zweig", year: 1926, genre: "Literary", cover: "confusion.jpg", list: "emman"},
  {id: 15, title: "Madonna in a Furcoat", author: "Sabahattin Ali", year: 1943, genre: "Literary", cover: "coat.jpg", list: "emman"},
  {id: 16, title: "Small Things like These", author: "Claire Keegan", year: 2020, genre: "Historical Fiction", cover: "small.jpg", list: "emman"},
  {id: 17, title: "The Posthumous Memoirs of Bras Cubas", author: "Machado De Asis", year: 1881, genre: "Literary", cover: "bras.jpg", list: "emman"},
  {id: 18, title: "A Room with a View", author: "E. M. Foster", year: 1908, genre: "Literary", cover: "room.jpg", list: "emman"},
  {id: 19, title: "Love", author: "Toni Morrison", year: 2003, genre: "Literary", cover: "love.jpg", list: "emman"}
];

let nextId = books.length;

// Populate '100 Books' Placeholder
for (let i = 1; i <= 100; i++) {
  books.push({
    id: nextId++, // unique ID
    title: `Book ${i}`,
    author: "",
    year: "",
    genre: "",
    quote: "",
    cover: "placeholder.jpg",
    list: "100"
  });
}

// Populate '1001 Books' Placeholder
for (let i = 1; i <= 1001; i++) {
  books.push({
    id: nextId++, // unique ID continues
    title: `Book ${i}`,
    author: "",
    year: "",
    genre: "",
    quote: "",
    cover: "placeholder.jpg",
    list: "1001"
  });
}

// =======================
// Global State Variables
// =======================
let currentPage = 1;
const booksPerPage = 10;
let currentBookArray = [];
const favorites = new Set();

// =======================
// Sorting & Searching Algorithms
// =======================

// Quicksort: Alphabetical by Title
// Swap two books in the array
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Partition the array by pivot title
function partition(arr, low, high) {
  // Pick a random pivot index between low and high
  const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
  swap(arr, randomIndex, high); // Move it to end like usual

  const pivot = arr[high].title.toLowerCase();
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j].title.toLowerCase() < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, high);
  return i + 1;
}

// Quicksort main function (recursive, in-place)
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high); // pivot index

    quickSort(arr, low, pi - 1);  // left side
    quickSort(arr, pi + 1, high); // right side
  }
  return arr;
}

// Binary Search: Find All Matching Titles (Case-Insensitive)
// O(log n + k) to find duplicates
function binarySearchAll(arr, target) {
  target = target.toLowerCase();
  let low = 0, high = arr.length - 1, found = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midTitle = arr[mid].title.toLowerCase();
    if (midTitle === target) { found = mid; break; }
    midTitle < target ? low = mid + 1 : high = mid - 1;
  }

  if (found === -1) return [];

  const matches = [arr[found]];
  let left = found - 1, right = found + 1;

  while (left >= 0 && arr[left].title.toLowerCase() === target) matches.unshift(arr[left--]);
  while (right < arr.length && arr[right].title.toLowerCase() === target) matches.push(arr[right++]);

  return matches;
}

// =======================
// Rendering Functions
// =======================

// Render Book Items (Per Page)
function renderBooks(page = 1, bookArray = currentBookArray) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  const start = (page - 1) * booksPerPage;
  const paginated = bookArray.slice(start, start + booksPerPage);

  paginated.forEach((book) => {
  const bookItem = document.createElement('div');
  bookItem.className = 'book-item';
  bookItem.innerHTML = `
    <img src="covers/${book.cover}" alt="${book.title}">
    <div class="book-info">
      <h4>${book.title}</h4>
      <p>${book.author} • ${book.year} • ${book.genre}</p>
    </div>
    <button class="heart-btn ${favorites.has(book.id) ? 'favorited' : ''}" data-id="${book.id}">❤</button>
  `;
  bookList.appendChild(bookItem);
});

  renderPagination(page, bookArray);
   updateProgressTracker(); // update progress bar here

  const heartButtons = document.querySelectorAll('.heart-btn');
heartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.dataset.id);
    if (favorites.has(id)) {
      favorites.delete(id);
      button.classList.remove('favorited');
    } else {
      favorites.add(id);
      button.classList.add('favorited');
    }

    button.classList.remove('animate');
    void button.offsetWidth;
    button.classList.add('animate');

    updateProgressTracker();
  });
});

}

// Render Pagination Buttons
function renderPagination(page, bookArray) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(bookArray.length / booksPerPage);

  const pageInfo = document.createElement('div');
  pageInfo.textContent = `Page ${page} of ${totalPages}`;
  pageInfo.style.cssText = 'margin-bottom: 10px; font-weight: bold; color: #5a3e1b;';
  pagination.appendChild(pageInfo);

  if (page > 1) pagination.appendChild(createPaginationBtn('Previous', () => changePage(page - 1)));
  if (page < totalPages) pagination.appendChild(createPaginationBtn('Next', () => changePage(page + 1)));
}

function createPaginationBtn(text, onClick) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.onclick = () => { onClick(); window.scrollTo({top: 0, behavior: 'smooth'}); };
  return btn;
}

function changePage(newPage) {
  currentPage = newPage;
  renderBooks(currentPage);
}

// Attach Favorite (Heart) Button Events
function attachHeartEvents() {
  document.querySelectorAll('.heart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.dataset.title;
      if (favorites.has(title)) {
        favorites.delete(title);
        button.classList.remove('favorited');
      } else {
        favorites.add(title);
        button.classList.add('favorited');
      }
      // Trigger animation
      button.classList.remove('animate');
      void button.offsetWidth;
      button.classList.add('animate');
    });
  });
}

// =======================
// List Loading & Selection
// =======================
function loadBookList(listType) {
  document.getElementById('listSelection').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
  currentBookArray = books.filter(b => b.list === listType);
  quickSort(currentBookArray, 0, currentBookArray.length - 1); 
  currentPage = 1;

  // Update list details based on list type
  const titles = {
    emman: ["Emman's Favorite Books", "A curated list by Emmanuel Jesus T. Ducusin", "\"Mga paborito kong libro - mula puso at isip.\"", "profile/ej.jpg"],
    "100": ["Top 100 Books of All Time", "A curated list by Hello Kitty", "\"Books that shaped the world, the universe rather.\"", "profile/hello.jpg"],
    "1001": ["1001 Books to Read Before You Die", "A curated list by Kuromi", "\"Oh ano, kanina pako babad sa pagbabasa dito oh.\"", "profile/kuromi.jpg"]
  };

  const [title, subtitle, quote, img] = titles[listType];
  document.getElementById('listTitle').textContent = title;
  document.getElementById('listSubtitle').innerHTML = `<strong>${subtitle}</strong>`;
  document.getElementById('listQuote').innerHTML = `<em>${quote}</em>`;
  document.getElementById('listProfilePic').src = img;

  renderBooks(currentPage);
}

// =======================
// Navigation Controls
// =======================
function goToListSelection() {
  document.getElementById('landingPage').style.display = 'none';
  document.getElementById('listSelection').style.display = 'block';
}

function goBackToSelection() {
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('listSelection').style.display = 'block';
  resetSearch();
}

function goBackToLanding() {
  document.getElementById('listSelection').style.display = 'none';
  document.getElementById('landingPage').style.display = 'flex';
}

// =======================
// Search Functionality
// =======================
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  const sorted = quickSort(currentBookArray);
  const results = binarySearchAll(sorted, query);
  const resultDiv = document.getElementById('searchResult');

  document.getElementById('searchBtn').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'inline';

  if (results.length > 0) {
    renderBooks(1, results);
    document.getElementById('pagination').innerHTML = '';
  } else {
    resultDiv.textContent = 'Book not found';
    bookList.innerHTML = ''; // hide book list
    pagination.innerHTML = ''; // hide pagination
  }
});

document.getElementById('resetBtn').addEventListener('click', resetSearch);

function resetSearch() {
  document.getElementById('searchResult').textContent = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchBtn').style.display = 'inline';
  document.getElementById('resetBtn').style.display = 'none';
  renderBooks(currentPage);
}

// =======================
// Modal Handling (Team & About)
// =======================
setupModal('teamModal', 'toggleTeamBtn');
setupModal('aboutModal', 'toggleAboutBtn');

function setupModal(modalId, btnId) {
  const modal = document.getElementById(modalId);
  const toggleBtn = document.getElementById(btnId);
  const closeBtn = modal.querySelector('.close');

  toggleBtn.addEventListener('click', () => { modal.style.display = 'block'; });
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

const track = document.querySelector('.carousel-track');
let carouselBooks = []; // make global
let carouselIndex = 0; // start at first book
let autoSlideInterval;

// Get 5 random books excluding 'placeholder.jpg'
function getRandomBooks(n) {
  const realBooks = books.filter(book => book.cover !== 'placeholder.jpg');
  const shuffled = realBooks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Populate carousel with 5 random books
function populateCarousel() {
  const randomBooks = getRandomBooks(13);
  track.innerHTML = ''; // Clear existing

  randomBooks.forEach((book, index) => {
    const img = document.createElement('img');
    img.src = `covers/${book.cover}`;
    img.alt = book.title;
    img.classList.add('carousel-book');
    if (index === carouselIndex) img.classList.add('active');
    track.appendChild(img);
  });

  carouselBooks = document.querySelectorAll('.carousel-book'); // update after population
}

function updateCarousel() {
  if (!carouselBooks.length) return;

  const bookWidth = carouselBooks[0].offsetWidth + 10; // width + margin
  const visibleWidth = document.querySelector('.carousel-track-wrapper').offsetWidth;
  const offset = (visibleWidth / 2) - (bookWidth / 2) - (carouselIndex * bookWidth);

  track.style.transform = `translateX(${offset}px)`;

  // Update active class for opacity & scaling
  carouselBooks.forEach((book, i) => {
    book.classList.toggle('active', i === carouselIndex);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselBooks.length;
    updateCarousel();
  }, 3000); // slide every 3 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Event listeners for buttons
document.querySelector('.carousel-btn.left').addEventListener('click', () => {
  carouselIndex = (carouselIndex - 1 + carouselBooks.length) % carouselBooks.length;
  updateCarousel();
  resetAutoSlide();
});

document.querySelector('.carousel-btn.right').addEventListener('click', () => {
  carouselIndex = (carouselIndex + 1) % carouselBooks.length;
  updateCarousel();
  resetAutoSlide();
});

// On window load
window.addEventListener('load', () => {
  populateCarousel();
  setTimeout(() => {
    updateCarousel();
    startAutoSlide(); // add this
  }, 100); // wait for rendering
});

window.addEventListener('resize', () => {
  updateCarousel();
});

function updateProgressTracker() {
  const totalBooks = currentBookArray.length;

  // Count how many items in 'favorites' match currentBookArray index
  const favoritedBooks = currentBookArray.filter(book => favorites.has(book.id)).length;

  const progressPercent = totalBooks === 0 ? 0 : ((favoritedBooks / totalBooks) * 100).toFixed(0);

  document.getElementById('bookCount').textContent = `${favoritedBooks} of ${totalBooks} books`;
  document.getElementById('progressPercent').textContent = `${progressPercent}%`;
  document.getElementById('progressBar').style.width = `${progressPercent}%`;

  // Move coffee icon
  const containerWidth = 200; // adjust if progress bar width changes
  const icon = document.getElementById('progressIcon');
  const iconOffset = (progressPercent / 100) * containerWidth;
  icon.style.left = `${iconOffset}px`; // center icon (20px wide)
}

makeDraggable(document.getElementById("progressTracker"));

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, isDragging = false;

  el.style.cursor = "move";

  el.addEventListener("mousedown", dragStart);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("mousemove", drag);

  el.addEventListener("touchstart", dragStartTouch);
  document.addEventListener("touchmove", dragTouch);
  document.addEventListener("touchend", dragEnd);

  function dragStart(e) {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 10000;
  }

  function drag(e) {
    if (!isDragging) return;
    el.style.left = (e.clientX - offsetX) + "px";
    el.style.top = (e.clientY - offsetY) + "px";
    el.style.position = "fixed";
  }

  function dragStartTouch(e) {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - el.offsetLeft;
    offsetY = touch.clientY - el.offsetTop;
    el.style.zIndex = 10000;
  }

  function dragTouch(e) {
    if (!isDragging) return;
    const touch = e.touches[0];
    el.style.left = (touch.clientX - offsetX) + "px";
    el.style.top = (touch.clientY - offsetY) + "px";
    el.style.position = "fixed";
  }

  function dragEnd() {
    isDragging = false;
  }
}
