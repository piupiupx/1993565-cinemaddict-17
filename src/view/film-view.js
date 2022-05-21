import ViewConstructor from './view-constructor.js';
const createFilmBoardTemplate = () =>
  '<section class="films-list"></section>';


export default class FilmView extends ViewConstructor {
  constructor() {
    super(createFilmBoardTemplate);
  }
}
