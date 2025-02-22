import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "/img/errorIcon.svg";

import { axiosGetQuery } from "./js/pixabay-api";

export let lightbox = new SimpleLightbox('.gallery-item a', {
    captionsData: 'alt',
    captionDelay: 250
});

const axiosUrl = "https://pixabay.com/api/";
const axiosApiKey = "48935576-d8f228bedc4e06321fc81a092";
const axiosParams = {
        key: axiosApiKey,
        orientation: "horizontal",
        q: "",
    };

const form = document.querySelector('.input-form');
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const keywordString = form.querySelector('.user-input').value.trim();
           
    if (!keywordString) {
        showToaster({
            title: 'Warning: ',
            titleColor: '#fff',
            message: 'please, enter keywords for search.',
            position: 'topRight',
            backgroundColor: '#ffa000',
            messageColor: '#fff',
            iconUrl: errorIcon,
            iconColor: '#fff',
            theme: 'dark',
        });
        return;
    }

    axiosParams.q = keywordString;
    axiosGetQuery(axiosUrl, axiosParams);
}

export const showToaster = options => {
    iziToast.show(options)
};
