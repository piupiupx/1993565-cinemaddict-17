import { generateFilm } from '../fishmock/film.js';

export default class FilmModel {
  filmsArr = Array.from({ length: 5 }, generateFilm);

  getFilms = () => this.filmsArr;
}
