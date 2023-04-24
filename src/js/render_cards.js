export default function renderSearchCard(data) {
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

  document.querySelector('.gallery').innerHTML += cards;
}
