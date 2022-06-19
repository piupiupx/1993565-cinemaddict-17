import FilmsListView from '../view/films-list-container-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import FilmView from '../view/film-view.js';
import EmptyListView from '../view/list-empty-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-butons-view.js';
import { updateItem } from '../util.js';
import { SortType } from '../const.js';
import { sortByRating, sortByDate } from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;
export default class CardListPresenter {
  #filmsListComponent = new FilmsListView();
  #boardComponent = new FilmView();
  #sortComponent = new SortView();
  #noFilmComponent = new EmptyListView();
  #loadMoreButtonComponent = new ShowMoreButtonView();
  #boardFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];
  #films;
  #filmsModel = null;
  #boardContainer = null;

  constructor(filmsModel, boardContainer) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#boardFilms = this.#filmsModel.films;
    this.#sourcedBoardFilms = this.#filmsModel.films;
    this.#renderBoard();
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(
      this.#renderedFilmCount,
      this.#renderedFilmCount + FILM_COUNT_PER_STEP
    );

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    this.#renderSort();
    this.#renderFilmList();
  };

  #renderFilms = (from, to) => {
    this.#boardFilms.slice(from, to).forEach((film) => this.#renderFilm(film));
  };

  #renderNoFilms = () => {
    render(
      this.#noFilmComponent,
      this.#boardComponent.element,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#boardComponent.element);

    this.#loadMoreButtonComponent.setClickHandler(
      this.#handleLoadMoreButtonClick
    );
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  };

  #renderFilmList = () => {
    render(this.#filmsListComponent, this.#boardComponent.element);
    this.#renderFilms(
      0,
      Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP)
    );

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#boardFilms.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#boardFilms.sort(sortByRating);
        break;
      default:
        this.#boardFilms = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    // - Очищаем список
    // - Рендерим список заново
    this.#clearFilmList();
    this.#renderFilmList();
  };

  #renderSort = () => {
    render(
      this.#sortComponent,
      this.#boardComponent.element,
      RenderPosition.AFTERBEGIN
    );
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (film) => {
    this.comments = film.comments;

    const filmPresenter = new FilmPresenter(
      this.#filmsListComponent.element,
      this.#handleFilmChange,
      this.#handleModeChange
    );
    filmPresenter.init(film, this.comments);
    this.#filmPresenter.set(film.id, filmPresenter);
    this.#loadMoreButtonComponent.setClickHandler(
      this.#handleLoadMoreButtonClick
    );
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
  };
}
