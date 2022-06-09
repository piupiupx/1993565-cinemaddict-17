import { filter } from '../utils/filter.js';

export const generateFilter = (films) => {
  Object.entries(filter).map(([filterName, filterFilms]) => ({
    name: Number(filterName),
    count: filterFilms(films).length,
  }));
};
