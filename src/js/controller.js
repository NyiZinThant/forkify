import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipe.view.js';
import searchView from './views/search.view.js';
import resultsView from './views/results.view.js';
import * as modal from './modal.js';
import { async } from 'regenerator-runtime';

const controlRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    recipeView.renderSpinner();
    // load recipe
    await modal.loadRecipe(hash);
    // render recipe
    recipeView.render(modal.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await modal.loadSearchResult(query);
    resultsView.render(modal.state.search.results);
  } catch (error) {
    console.error(error);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
