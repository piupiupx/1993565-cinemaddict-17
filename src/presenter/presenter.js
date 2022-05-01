import { render } from '../render.js';
import FilmsListView from '../view/films-list-container-view.js';
import NavigationListView from '../view/navigation-list-view.js';
import FiltersView from '../view/filter-buttons-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class CardListPresenter {
  FILM_CARDS_COUNT = 5;
  filmsListComponent = new FilmsListView();

  init = (filmsListContainer) => {
    render(new NavigationListView(), filmsListContainer);
    render(new FiltersView(), filmsListContainer);
    render(this.filmsListSectionComponent, filmsListContainer);
    render(
      this.filmsListComponent,
      this.filmsListSectionComponent.getElement()
    );
    render(new PopupView(), document.body);

    for (let i = 0; i < this.FILM_CARDS_COUNT; i++) {
      render(new FilmCardView(), this.filmsListComponent.getElement());
    }
    render(
      new ShowMoreButtonView(),
      this.filmsListSectionComponent.getElement()
    );
  };
}
