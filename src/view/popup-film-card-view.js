import ViewConstructor from "./view-constructor.js";
import {
  humanizeFilmDate,
  humanizeRuntime,
  humanizeCommentDate,
} from "../util";

const createPopupFilmTemplate = (film, commentsList) => {
  console.log(film, "FILNfrVIEW");
  const { comments, filmInfo, userDetails } = film;
  const {
    title,
    alternativeTitle,
    poster,
    ageRating,
    totalRating,
    release,
    runtime,
    description,
    genre,
    director,
    writers,
    actors,
  } = filmInfo;
  const { date, releaseCountry } = release;
  const createControlsTemplate = (userDetails) => {
    const ACTIVE_CONTROL_CLASS = "film-details__control-button--active";
    const { watchlist, alreadyWatched, favorite } = userDetails;

    const watchlistClassName = watchlist ? ACTIVE_CONTROL_CLASS : "";

    const watchedClassName = alreadyWatched ? ACTIVE_CONTROL_CLASS : "";

    const favoriteClassName = favorite ? ACTIVE_CONTROL_CLASS : "";
  };

  const createGenresTemplate = (genres) =>
    genres
      .map((genre) => `<span class="film-details__genre">${genre}</span>`)
      .join("");

  const createCommentsTemplate = (comments) =>
    comments
      .map(
        (comment) =>
          `<li class="film-details__comment" >
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${
        comment.emotion
      }.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${humanizeCommentDate(
          comment.date
        )}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`
      )
      .join("");

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${ageRating}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original:  ${alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(", ")}</td>
            </tr>
            <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(", ")}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeFilmDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${humanizeRuntime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${
                genre.length > 1 ? "Genres" : "Genre"
              }</td>
                   <td class="film-details__cell">${createGenresTemplate(
                     genre
                   )}</td>
          </tbody></table>
          <p class="film-details__film-description">${description}
          </p>
        </div>
      </div>
      ${createControlsTemplate(userDetails)}
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
          comments.length
        }</span></h3>
        <ul class="film-details__comments-list"> ${createCommentsTemplate(
          commentsList
        )}</ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
          </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupView extends ViewConstructor {
  constructor(film, comments) {
    const currMovieComments = comments.filter((comment) =>
      film.comments.some((filmCommentId) => filmCommentId === comment.id)
    );
    super(() => createPopupFilmTemplate(film, currMovieComments));
  }
}
