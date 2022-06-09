import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film.id),
  [FilterType.WATCHLIST]: (films) =>
    films.filter((film) => {
      const {
        userDetails: { watchlist },
      } = film;
      return watchlist;
    }),
  [FilterType.HISTORY]: (films) =>
    films.filter((film) => {
      const {
        userDetails: { alreadyWatched },
      } = film;
      return alreadyWatched;
    }),
  [FilterType.FAVORITES]: (films) =>
    films.filter((film) => {
      const {
        userDetails: { favorite },
      } = film;
      return favorite;
    }),
};

export { filter };
