import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-film-card-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmsListComponent = null;
  #filmComponent = null;
  #popupComponent = null;
  #film = null;
  #mode = Mode.DEFAULT;
  #changeData = null;
  #changeMode;
  constructor(filmsListComponent, changeData, changeMode) {
    this.#filmsListComponent = filmsListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, comments) => {
    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;
    this.comments = comments;
    this.#filmComponent = new FilmCardView(film);

    this.#popupComponent = new PopupView(film, this.comments);

    this.#film = film;

    this.#filmComponent.setEditClickHandler(() => {
      this.#replacePopupToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#popupComponent.setFormSubmitHandler(() => {
      this.#replaceFormToPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this.#filmComponent, this.#filmsListComponent);
      return;
    }

    if (this.#filmsListComponent.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPopup();
    }
  };

  #replacePopupToForm = () => {
    replace(this.#popupComponent, this.#filmComponent);
    this.#changeMode();
    this.#mode = Mode.OPEN;
  };

  #replaceFormToPopup = () => {
    replace(this.#filmComponent, this.#popupComponent);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, favorite: !this.#film.favorite });
  };

  #handleWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      alreadyWatched: !this.#film.alreadyWatched,
    });
  };

  #handleWatchListClick = () => {
    this.#changeData({ ...this.#film, watchlist: !this.#film.watchlist });
  };
}
