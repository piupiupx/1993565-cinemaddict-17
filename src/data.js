import FilmModel from "./model/film-model.js";
import CommentModel from "./model/comments-model.js";
import { getRandomInteger } from "./util.js";

const getFilmsData = () => {
  const films = [...new FilmModel().getFilms()];
  const comments = [...new CommentModel().getComments()];

  for (const film of films) {
    const count = getRandomInteger(0, comments.length - 1);
    for (let i = 0; i < count; i++) {
      const randomId = comments[getRandomInteger(0, comments.length - 1)].id;
      if (!film.comments.includes(randomId)) {
        film.comments.push(randomId);
      }
    }
  }
  return { films, comments };
};

export { getFilmsData };
