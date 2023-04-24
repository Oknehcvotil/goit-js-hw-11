export default function onScroll() {
  const { height: photoCard } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: photoCard * 2,
    behavior: 'smooth',
  });
}
