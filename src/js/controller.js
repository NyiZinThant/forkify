import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipe.view.js';
import * as modal from './modal.js';

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
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
