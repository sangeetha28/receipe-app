import search from './model/search';
import res from './model/receipe';
import list from './model/shopping';
import likes from  './model/likes';
import * as searchView from './view/searchview';
import * as recipeview from './view/receipeview';
import * as shoppingview from './view/shoppingview';
import { elements } from './view/base';
import * as likesview from './view/likesview';

/*** Application state Object ****/

const state = {};

export const searchRecipe = async () => {
    try {
       const query = searchView.getUserInput();
       console.log(query);
       if(query) {
           state.search = new search(query);
           searchView.clearInput();
           searchView.clearResults();
           searchView.renderLoader(elements.resultContainer);
           await state.search.getReceipe();
           searchView.clearLoader();
           searchView.renderRecipes(state.search.result)
       }
    }
    catch(error)
    {
        alert(error);
    }

}

export const listController = () => {
    if(!state.list) state.list = new list();

    state.receipe.ingredients.forEach(e => {
        const item = state.list.addItem(e.count,e.unit,e.ingredient);
        shoppingview.renderItems(item);
    });

}

state.likes = new likes();

export const likesController = () => {
    if(!state.likes) state.likes = new likes();
    const id = state.receipe.id;
    // If NOT Liked ...
    if(!state.likes.isLiked(id)){
        //add to the list
        const item = state.likes.addLikes(id,state.receipe.title,state.receipe.publisher,state.receipe.image_url);
        likesview.updateLikeButton(true);
        likesview.renderFavourites(item);
    }
    else{
        state.likes.removeLikes(id);
        console.log('Like Removed!')
        console.log(state.likes);
        likesview.updateLikeButton(false);
        likesview.removeFavourites(id)
    }
}

const recipeController = async () =>
{
   const id = window.location.hash.replace('#','');
   console.log(id);
   if(id) {
       try {
           state.receipe = new res(id);
           if(state.search) searchView.searchHighlight(id);
           await state.receipe.getRecipe();
           recipeview.clearReceipe();
           state.receipe.calcPrepTime();
           state.receipe.serveCount();
           state.receipe.parseIngredient();
           const status = state.likes.isLiked(id);
           recipeview.renderRecipe(state.receipe,status);
       }
       catch (error) {
           alert(error);
       }
   }
}

elements.searchButton.addEventListener('submit', e => {
     e.preventDefault(); // will prevent loading the app again
     searchRecipe();
});

elements.paginationButtons.addEventListener('click',e=> {
    const button = e.target.closest('.btn-inline');
    if(button)
    {
        const goto = parseInt(button.dataset.goto,10);
        searchView.clearResults();
        searchView.renderRecipes(state.search.result,goto)
    }
});

elements.shoppinglist.addEventListener('click',e=> {
    const id = document.querySelector('.shopping__item').dataset.itemid;
if(e.target.matches('.btn-tiny--remove, .btn-tiny--remove *'))
{
    state.list.deleteItem(id);
    shoppingview.deleteItem(id);
}else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
}
});



// elements.headerLikes.addEventListener('click', e => {
//    likesview.renderFavourites(state.likes)
// });

// adding event listener for each for the change
['hashchange','load'].forEach(event => window.addEventListener(event,recipeController));

elements.receipeContainer.addEventListener('click', e => {
   if(e.target.matches('.btn-decrease,.btn-decrease *')) {
    if(state.receipe.serveCount > 1) {
      state.receipe.updateServings('dec');
      recipeview.updateUI(state.receipe);
     }
    }
   else if (e.target.matches('.btn-increase,.btn-increase *'))
   {
     state.receipe.updateServings('inc');
     recipeview.updateUI(state.receipe);
   }
   else if (e.target.matches('.recipe__btn--add ,.recipe__btn--add *'))
  {
     listController();
  }
else if (e.target.matches('.recipe__love, .recipe__love *'))
{
    console.log('likescontroller');
    likesController();
}

});


