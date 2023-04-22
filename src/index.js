import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
let searchValue = '';

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoad);

function onSubmit(e) {
  e.preventDefault();
  searchValue = refs.input.value.trim();

  fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  )
    .then(r => {
      if (!r.ok) {
        return;
      }
      return r.json();
    })
    .then(data => {
      page += 1;
      console.log(data);
      if (data.totalHits === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      renderSearchCard(data.hits);
    })
    .catch(() =>
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function onLoad(e) {
  fetch(
    `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  )
    .then(r => {
      if (!r.ok) {
        return;
      }
      return r.json();
    })
    .then(data => {
      page += 1;
      return renderSearchCard(data.hits);
    })
    .catch(console.log);
}

function renderSearchCard(datas) {
  const cards = datas
    .map(
      data => `<div class="photo-card">
  <img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: <span>${data.likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span>${data.views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span>${data.comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span>${data.downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.gallery.innerHTML = cards;
}
