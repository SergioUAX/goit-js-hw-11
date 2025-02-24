import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from "./img/errorIcon.svg";

import { axiosGetQuery } from "./js/pixabay-api";

import {
    renderGallery,
    renderLoader,
    refresh,    
} from "./js/render-functions";

export let lightbox = new SimpleLightbox('.gallery-item a', {
    captionsData: 'alt',
    captionDelay: 250
});

const axiosUrl = "https://pixabay.com/api/";
const axiosApiKey = "48935576-d8f228bedc4e06321fc81a092";
const axiosParams = {
        key: axiosApiKey,        
        q: "",
    };

const toastParams = {
    title: '',
    titleColor: '#fff',
    message: '',
    position: 'topRight',
    backgroundColor: '',
    messageColor: '#fff',
    iconUrl: errorIcon,
    iconColor: '#fff',
    theme: 'dark',
};
    
const form = document.querySelector('.input-form');
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const keywordString = form.querySelector('.user-input').value.trim();
           
    if (!keywordString) {
        toastParams.title = 'Warning: ';
        toastParams.message = 'please, enter keywords for search.';
        toastParams.backgroundColor = '#ffa000';
        showToaster( toastParams );
        return;
    }

    axiosParams.q = keywordString;
    renderLoader();
    axiosGetQuery(axiosUrl, axiosParams)
        .then(
            response => {
                refresh();
                if (!response.data.total) {                    
                    toastParams.title = 'Error: ';
                    toastParams.message = 'Sorry, there are no images matching your search query. Please, try again!';
                    toastParams.backgroundColor = '#ef4040';
                    showToaster( toastParams );                    
                    return;
                }                
                renderGallery(response.data.hits);
            }
        )
        .catch(error => {
            toastParams.title = 'Error: ';
            toastParams.message = error.message;
            toastParams.backgroundColor = '#ef4040';
            showToaster( toastParams );
        }
        )
}

export const showToaster = toastParams => {
    iziToast.show(toastParams)
};
