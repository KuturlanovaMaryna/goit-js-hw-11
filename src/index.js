import "./css/styles.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api";
import { refs } from "./js/refs";
import { renderGalleryMarkup} from "./js/createmarkup";



const lightbox = new SimpleLightbox('.gallery a');

const hideBtnLoadMore = () => (refs.loadMoreBtn.style.display = 'none');
const showBtnLoadMore = () => (refs.loadMoreBtn.style.display = 'block');
hideBtnLoadMore();

let page = 1;
let perPage = 40;

refs.searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();

  let request = refs.searchForm.elements.searchQuery.value.trim();
  page = 1;
  cleanGallery();

  if (request === '') {
    hideBtnLoadMore();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  try {
    const galleryItems = await fetchImages(request, page);
    let totalPages = galleryItems.data.totalHits;

    if (galleryItems.data.hits.length === 0) {
      cleanGallery();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (totalPages >= 1 && totalPages < 40) {
      hideBtnLoadMore();
      Notify.success(`Hooray! We found ${totalPages} image.`);
    } else if (totalPages > 40) {
      showBtnLoadMore();
      Notify.success(`Hooray! We found ${totalPages} image.`);
    }
    renderGalleryMarkup(galleryItems.data.hits);

    lightbox.refresh();
  } catch (error) {
    console.log(error);
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  lightbox.refresh();
}


refs.loadMoreBtn.addEventListener('click', onClickBtnLoadMore);

async function onClickBtnLoadMore() {
  page += 1;
  let request = refs.searchForm.elements.searchQuery.value.trim();

  try {
    const galleryItems = await fetchImages(request, page);
      let showPages = galleryItems.data.totalHits / perPage;

    if (showPages <= page) {
      hideBtnLoadMore();
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }

    renderGalleryMarkup(galleryItems.data.hits);
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  lightbox.refresh();
}

function cleanGallery() {
  refs.galleryImages.innerHTML = '';
  page = 1;
  hideBtnLoadMore();
}