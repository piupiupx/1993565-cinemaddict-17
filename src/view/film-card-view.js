import { humanizeFilmDate, humanizeRuntime } from '../utils/film.js';
import AbstractView from '../framework/view/abstract-view.js';

const BLANK_FILM = {
  comments: [],
  filmInfo: '',
  title: '',
  date: null,
  poster: null,
  totalRating: null,
  release: null,
  runtime: null,
  description: '',
  genre: [],
};

const createFilmCardTemplate = (film) => {
  //const MAX_DESCRIPTION_LENGTH = 140;

  const { comments, filmInfo } = film;

  const {
    title,
    poster,
    totalRating,
    release,
    runtime,
    description,
    genre,
  } = filmInfo;
  const { date } = release;

  const filmDate = date !== null ? humanizeFilmDate(date) : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmDate}</span>
        <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;
  constructor(film = BLANK_FILM) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('#favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('#watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('#watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#editClickHandler);
  };
}
