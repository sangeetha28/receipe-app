
import { elements } from './base';
import {searchRecipe} from "../index";


// below arrow function will automatcically return as it is one liner and without any curly braces
export const getUserInput = () => elements.searchInput.value;

//Clear Input from the text field, below arrow function has a curly braces as we do not want any implicit return.
export const clearInput = () => { elements.searchInput.value = ''};
export const clearResults = () => {
    elements.resultResults.innerHTML = '' ;
    elements.paginationButtons.innerHTML = '' ;
};

export const renderLoader = parentElement => {
    const loader = `
       <div class="loader">
       <svg>
         <use href="img/icons.svg#icon-cw"></use>
       </svg>
       </div>
    `;
    parentElement.insertAdjacentHTML("afterbegin",loader);
}


export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.parentElement.removeChild(loader);
}

// Title limiter function

// the value that is return from the each iteration of the reduce function will be stored in the accumlator

const titleLimiter = (title,limit = 17) => {
    const newTitle = [];
    if (title.length >= limit) {
        title.split(' ').reduce((acc,cur)=>{
            if(acc + cur.length <= limit) {
            newTitle.push(cur);
        }
        return acc + cur.length;
    },0)
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

//type can only be prev or next, function returns a markUp
const createButton = (page,type) =>
       `
           <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page -1 : page +1}">
                <span>Page ${type === 'prev' ? page-1 : page+1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
                
            </button>
            `;


const renderButtons = (page,numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if (page === 1 && pages > 1)
    {
        button = createButton(page,'next');
    }
    else if (page < pages) {
        button = `${createButton(page,'prev')}
        ${createButton(page,'next')}`;

    }
    else if (page === pages && pages > 1 ) {
        button = createButton(page,'prev');
    }
   elements.paginationButtons.insertAdjacentHTML("afterbegin",button);
};

export const searchHighlight = (id) => {
    const searchList = Array.from(document.querySelectorAll('.results__link'));
    searchList.forEach(e => {
        e.classList.remove('results__link--active');
    });
    //when using classList do not add class
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

// Display the results in the ui
export const renderRecipes = (recipe,page=1,resPerPage=10) => {
    const start = (page - 1) * resPerPage; // in page 1 start: 0 page 2 start 10 page 3 start 30
    const end = page * resPerPage;
    recipe.slice(start,end).forEach(e=>renderUI(e));
    renderButtons(page,recipe.length,resPerPage);
};



const renderUI = (r) => {
    const markUp = `<li> 
                <a class="results__link results" href="#${r.recipe_id}">
                    <figure class="results__fig">
                        <img src=${r.image_url} alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${titleLimiter(r.title)}</h4>
                        <p class="results__author">${r.publisher}</p>
                    </div>
                </a>
            </li>`;
  elements.resultResults.insertAdjacentHTML("beforeend",markUp);
};