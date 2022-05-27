import { render } from '../render.js';
import FilmsListView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmView from '../view/film-view.js';
import PopupView from '../view/popup-film-card-view.js';
import EmptyListView from '../view/list-empty-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILM_COUNT_PER_STEP = 5;
export default class CardListPresenter {
  #filmsListComponent = new FilmsListView();
  #boardComponent = new FilmView();
  #loadMoreButtonComponent = new ShowMoreButtonView();
  #boardFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #films;
  init = (filmsListContainer, filmsData) => {
    this.filmsListContainer = filmsListContainer;
    this.#films = filmsData.films;
    this.#boardFilms = [...this.#films];
    this.comments = filmsData.comments;


    render(this.#boardComponent, this.filmsListContainer);
    render(this.#filmsListComponent, this.#boardComponent.element);

    for (let i = 0; i < Math.min( this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#boardFilms[i]);
    }

    if (this.#boardFilms.length >= FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, filmsListContainer );
      this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }

  };

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#boardFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }

  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film, this.comments);

    const replacePopupToForm = () => {
      this.#filmsListComponent.element.appendChild(popupComponent.element);
    };

    const replaceFormToPopup = () => {
      this.#filmsListComponent.element.replaceChild( filmComponent.element, popupComponent.element);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.querySelector('.film-card__poster').addEventListener('click', () => {

      replacePopupToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      replaceFormToPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render( filmComponent, this.#filmsListComponent.element);
  };
}
