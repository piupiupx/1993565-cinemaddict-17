import AbstractView from '../framework/view/abstract-view.js';

const createFilmBoardTemplate = () => '<section class="films-list"></section>';

export default class FilmView extends AbstractView {
  get template() {
    return createFilmBoardTemplate();
  }
}
