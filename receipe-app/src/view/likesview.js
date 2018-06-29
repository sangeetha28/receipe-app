import { elements } from './base';

export const updateLikeButton = status => {
    const img = status ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${img}`);

    // const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}



export const renderFavourites = (receipe) => {
 console.log('Rendering favourites');
  const markup = `<li>
                        <a class="likes__link" href=#${receipe.id}>
                            <figure class="likes__fig">
                                <img src=${receipe.image} alt="Test">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${receipe.title}</h4>
                                <p class="likes__author">${receipe.author}</p>
                            </div>
                        </a>
                    </li>`;

  elements.likesList.insertAdjacentHTML('beforeend',markup);
};

export const removeFavourites = (id) => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};