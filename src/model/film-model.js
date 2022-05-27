import { generateFilm } from '../fishmock/film.js';

export default class FilmModel {
  #filmsArr = Array.from({ length: 45 }, generateFilm);
  get films () {
    return this.#filmsArr;}
}

