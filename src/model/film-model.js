import { generateFilm } from '../fishmock/film.js';

const FILM_CARDS_QUANTITY = 45;
export default class FilmModel {
  #filmsArr = Array.from({ length: FILM_CARDS_QUANTITY}, generateFilm);
  get films () {
    return this.#filmsArr;}
}

