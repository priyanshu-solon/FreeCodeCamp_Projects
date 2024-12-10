const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
.then((res) => res.json())
