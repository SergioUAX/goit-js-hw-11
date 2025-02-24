import { lightbox } from "../main";

const imageGallery = document.querySelector(".gallery");  

export function renderGallery(images) {        
    const markup = images
        .map((image) =>
            `<li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
            <img
            class="gallery-image"
            src="${image.webformatURL}"
            data-source="${image.largeImageURL}"
            alt="${image.tags}"      
            />
            </a>
            
            <div class="gallery-item-info">
                <ul class="gallery-item-info-list">
                    <li class="gallery-item-info-list-item">
                    <p class ="gallery-item-info-list-item-name">Likes</p>
                    <p class ="gallery-item-info-list-item-value">${image.likes}</p>
                    </li>
                    <li class="gallery-item-info-list-item">
                    <p class ="gallery-item-info-list-item-name">Views</p>
                    <p class ="gallery-item-info-list-item-value">${image.views}</p>
                    </li>
                    <li class="gallery-item-info-list-item">
                    <p class ="gallery-item-info-list-item-name">Comments</p>
                    <p class ="gallery-item-info-list-item-value">${image.comments}</p>
                    </li>
                    <li class="gallery-item-info-list-item">
                    <p class ="gallery-item-info-list-item-name">Downloads</p>
                    <p class ="gallery-item-info-list-item-value">${image.downloads}</p>
                    </li>
                </ul>
            </div>
            </li>
        `)
        .join("");
    
    imageGallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

export function renderLoader() {
    const markup = `<span class="loader">Loading images, please wait...</span>`;
    imageGallery.insertAdjacentHTML("beforeend", markup);
    
}
 export function refresh () { 
        imageGallery.innerHTML = "";
}
    