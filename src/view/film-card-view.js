import { humanizeRuntime, humanizeFilmDate } from '../util';
import ViewConstructor from './view-constructor.js';

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

export default class FilmCardView extends ViewConstructor {
  constructor(film) {
    super(() => createFilmCardTemplate(film));
  }
}
