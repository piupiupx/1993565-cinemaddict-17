import dayjs from 'dayjs';
import { getRandomInteger } from '../util.js';

const humanizeRuntime = (runtime) => {
  const HOUR = 60;

  const hours = Math.floor(runtime / HOUR);
  const minutes = runtime % HOUR;

  return `${hours}h ${minutes}m`;
};
const humanizeFilmDate = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeCommentDate = (date) => dayjs(date).format('YY/MM/D hh:m');
const getRandomDate = (minDaysGap, maxDaysGap) => {
  const daysGap = getRandomInteger(minDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};
const formatDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
};

const generateDate = (minDaysGap, maxDaysGap) => {
  const daysGap = getRandomInteger(minDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};


const getWeightForNull = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (filmA, filmB) => {
  const dateA = filmA.filmInfo.release.date;
  const dateB = filmB.filmInfo.release.date;

  const weight = getWeightForNull(dateA, dateB);

  return weight ?? dayjs(dateB).diff(dayjs(dateA));
};

const sortByRating = (filmA, filmB) => {
  const ratingA = filmA.filmInfo.totalRating;
  const ratingB = filmB.filmInfo.totalRating;

  const weight = getWeightForNull(ratingA, ratingB);

  return weight ?? ratingB - ratingA;
};


const getUniqueValues = (array) =>
  array.filter((value, index, self) => self.indexOf(value) === index);


const isFilmWatchlist = (watchlist) => Object.values(watchlist).some(Boolean);

const isFilmWatched = (alreadyWatched) => Object.values(alreadyWatched).some(Boolean);

const isFilmFavorite = (favorite) => Object.values(favorite).some(Boolean); // функция проверяющая конкретное свойство объекта

export {
  humanizeRuntime,
  humanizeFilmDate,
  generateDate,
  humanizeCommentDate,
  getRandomDate,
  formatDescription,
  getUniqueValues,
  sortByRating,
  sortByDate,
  isFilmFavorite,
  isFilmWatched,
  isFilmWatchlist

};
