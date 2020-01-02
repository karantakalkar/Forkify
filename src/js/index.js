import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';

const state = {

}

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query){

        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{

            await state.search.getResults();

            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            alert('Search Error');
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result);
    }
});

/* recipe controller */

const controlRecipe =() => {

    const id = window.location.hash.replace('#','');

    if (id) {

        state.recipe = new Recipe(id);

        try {

        await state.recipe.getRecipe();

        state.recipe.calcTime();
        state.recipe.calcServings();
        } catch(err) {
            alert(`Error processing recipe!`);
        }
    }

}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe)