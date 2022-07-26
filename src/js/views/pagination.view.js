import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (this._data.currentPage === 1 && numPages > 1) {
      return this._generateMarkupNext();
    }
    if (this._data.currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrev();
    }
    if (this._data.currentPage > 1 && this._data.currentPage < numPages) {
      return this._generateMarkupBtn();
    }
    return '';
  }
  _generateMarkupBtn = function () {
    return this._generateMarkupPrev() + this._generateMarkupNext();
  };
  _generateMarkupPrev = function () {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.currentPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>
    `;
  };
  _generateMarkupNext = function () {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.currentPage + 1
      }">
        <span>Page${this._data.currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
    `;
  };
}
export default new PaginationView();
