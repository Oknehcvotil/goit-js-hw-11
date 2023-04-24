import renderSearchCard from './render_cards';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import onScroll from './smooth_scroll';
import openModal from './lightbox';

const axios = require('axios').default;
const { loadBtn, gallery } = refs;
let currentHits = null;

export default async function getImgs(searchValue, page) {
  const API_KEY = '35664571-75b29dbb0058a8cd226bd52d4';
  const URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const { data } = response;

    if (data.totalHits === 0) {
      return error;
    }

    if (page === 1) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      currentHits = null;
    }

    loadBtn.classList.add('visible');

    currentHits += data.hits.length;
    console.log(currentHits);

    renderSearchCard(data.hits);

    openModal();

    if (page > 1) {
      onScroll();
    }

    if (currentHits >= data.totalHits) {
      currentHits = null;
      page = 1;
      loadBtn.classList.remove('visible');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    loadBtn.classList.remove('visible');
    console.log(error);
    gallery.innerHTML = '';
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
