import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipe.view.js';
import searchView from './views/search.view.js';
import resultsView from './views/results.view.js';
import bookmarksView from './views/bookmarks.view.js';
import paginationView from './views/pagination.view.js';
import addRecipeView from './views/addRecipe.view.js';
import * as modal from './modal.js';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    recipeView.renderSpinner();
    // update result
    resultsView.update(modal.getSearchResultsPage());
    bookmarksView.update(modal.state.bookmarks);
    // load recipe
    await modal.loadRecipe(hash);
    console.log(modal.state.recipe);
    // render recipe
    recipeView.render(modal.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    modal.state.search.currentPage = 1;
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await modal.loadSearchResult(query);
    resultsView.render(modal.getSearchResultsPage());
    paginationView.render(modal.state.search);
  } catch (error) {
    console.error(error);
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(modal.getSearchResultsPage(goToPage));
  paginationView.render(modal.state.search);
};
const controlServings = function (newServings) {
  // update recipe servings
  modal.updateServings(newServings);
  // update recipe view
  // recipeView.render(modal.state.recipe);
  recipeView.update(modal.state.recipe);
};
const controlBookmark = function () {
  // add and remove bookmarks
  if (!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe);
  else modal.removeBookmark(modal.state.recipe.id);
  // update recipe view
  recipeView.update(modal.state.recipe);
  // render bookmarks
  bookmarksView.render(modal.state.bookmarks);
};
const controlRenderBookmark = function () {
  bookmarksView.render(modal.state.bookmarks);
};
const controlUpload = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await modal.uploadRecipe(newRecipe);
    console.log(modal.state.recipe);
    recipeView.render(modal.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(modal.state.bookmarks);
    window.history.pushState(null, '', `#${modal.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlRenderBookmark);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  addRecipeView.addHandlerUpload(controlUpload);
};
init();
