import "./css/styles.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImeges } from "./js/pixabay-api";

refs = {
    searchForm: document.querySelector(".search-form"),
    searchSubmitBtn: document.querySelector(".search-btn"),
    inputForm: document.querySelector(".input-form"),
}
