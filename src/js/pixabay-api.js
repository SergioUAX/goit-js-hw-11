import axios from 'axios';
import { renderGallery } from "./render-functions";
import { renderLoader } from './render-functions';
import { refresh } from './render-functions';

import { showToaster } from '../main';
import errorIcon from "/img/errorIcon.svg";

export function axiosGetQuery(url, params) {
    renderLoader();
    axios.get(url, { params })
        .then(
            response => {
                if (!response.data.total) {
                    showToaster({
                        title: 'Error: ',
                        titleColor: '#fff',
                        message: 'Sorry, there are no images matching your search query. Please, try again!',
                        position: 'topRight',
                        backgroundColor: '#ef4040',
                        messageColor: '#fff',
                        iconUrl: errorIcon,
                        iconColor: '#fff',
                        theme: 'dark',
                    });
                    refresh();
                    return;                    
                }
                renderGallery(response.data.hits);
            }
        )
        .catch(error => console.log(error))        
}