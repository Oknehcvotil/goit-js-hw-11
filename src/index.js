import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';
const axios = require('axios').default;

const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('button[type="submit"]'),
  input: document.querySelector('input[name="searchQuery"]'),
  loadBtn: document.querySelector('button[type="button"]'),
  gallery: document.querySelector('.gallery'),
};

const API_KEY = '35664571-75b29dbb0058a8cd226bd52d4';
const URL = 'https://pixabay.com/api/';
let page = 1;
let currentHits = null;
let searchValue = '';

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoad);

function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  searchValue = refs.input.value.trim();
  if (!searchValue) {
    return;
  }
  page = 1;
  getImgs(searchValue);
  const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

async function getImgs(searchValue) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const { data } = response;

    if (data.totalHits === 0) {
      return error;
    }

    refs.loadBtn.classList.add('visible');

    if (page === 1) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      currentHits = null;
    }

    currentHits += data.hits.length;
    console.log(currentHits);

    renderSearchCard(data.hits);

    openModal();

    if (currentHits >= data.totalHits) {
      currentHits = null;
      page = 1;
      refs.loadBtn.classList.remove('visible');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
    refs.loadBtn.classList.remove('visible');
    refs.gallery.innerHTML = '';
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onLoad(e) {
  page += 1;
  getImgs(searchValue);
}

function renderSearchCard(data) {
  const cards = data
    .map(
      datum => `<div class="photo-card">
      <a class="gallery__link" href="${datum.largeImageURL}">
  <img src="${datum.webformatURL}" alt="${datum.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <span>${datum.likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span>${datum.views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span>${datum.comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span>${datum.downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join('');

  refs.gallery.innerHTML += cards;
}

function openModal() {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
