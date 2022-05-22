import { render } from '../render.js';
import FilmsListView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmView from '../view/film-view.js';
import FilmModel from '../model/film-model.js';

import PopupView from '../view/popup-film-card-view.js';

import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class CardListPresenter {
  filmsListComponent = new FilmsListView();
  boardComponent = new FilmView();
  filmCardModel = new FilmModel();

  init = (filmsListContainer, filmsData) => {
    this.filmsListContainer = filmsListContainer;

    this.films = filmsData.films;
    this.comments = filmsData.comments;

    render(this.boardComponent, this.filmsListContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());

    render(new PopupView(this.films[0], this.comments), document.body);

    for (let i = 0; i < this.filmCardModel.filmsArr.length; i++) {
      render(
        new FilmCardView(this.films[i]),
        this.filmsListComponent.getElement()
      );
    }
    render(new ShowMoreButtonView(), filmsListContainer);
  };
}
