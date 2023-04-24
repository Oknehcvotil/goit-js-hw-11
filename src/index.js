// import InfiniteScroll from 'infinite-scroll';
import { refs } from './js/refs';
import getImgs from './js/get_images';

const { form, input, loadBtn, gallery } = refs;

let searchValue = '';
let page = null;

form.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);

function onSubmit(e) {
  e.preventDefault();

  gallery.innerHTML = '';
  searchValue = input.value.trim();
  page = 1;

  if (!searchValue) {
    loadBtn.classList.remove('visible');
    return;
  }

  getImgs(searchValue, page);
}

function onLoad(e) {
  page += 1;

  loadBtn.classList.remove('visible');

  getImgs(searchValue, page);
}
