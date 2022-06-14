import FilmsListView from '../view/films-list-container-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import FilmPresenter from './film-presenter.js';
import FilmView from '../view/film-view.js';
import EmptyListView from '../view/list-empty-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-butons-view.js';
import { updateItem } from '../util.js';

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

  #films;
  init = (filmsListContainer, filmsData) => {
    this.filmsListContainer = filmsListContainer;
    this.#films = filmsData.films;
    this.#boardFilms = [...this.#films];
    this.comments = filmsData.comments;
    render(this.#boardComponent, this.filmsListContainer);
    render(this.#filmsListComponent, this.#boardComponent.element);

    for (
      let i = 0;
      i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP);
      i++
    ) {
      this.#renderFilm(this.#boardFilms[i]);
    }

    if (this.#boardFilms.length >= FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, filmsListContainer);
      this.#loadMoreButtonComponent.setClickHandler(
        this.#handleLoadMoreButtonClick
      );
    }
    if (!this.#boardFilms.length) {
      render(new EmptyListView(), this.filmsListContainer);
    }
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
    render(this.#boardComponent, this.filmsListContainer);

    this.#loadMoreButtonComponent.setClickHandler(
      this.#handleLoadMoreButtonClick
    );

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

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTaskChange = (updatedTask) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedTask);
    this.#filmPresenter.get(updatedTask.id).init(updatedTask);
  };

  #renderSort = () => {
    render(
      this.#sortComponent,
      this.#boardComponent.element,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsListComponent.element,
      this.#handleTaskChange,
      this.#handleModeChange
    );
    filmPresenter.init(film, this.comments);
    this.#filmPresenter.set(film.id, filmPresenter);
    this.#loadMoreButtonComponent.setClickHandler(
      this.#handleLoadMoreButtonClick
    );
  };
}
