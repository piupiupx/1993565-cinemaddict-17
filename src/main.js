import { render } from './render.js';
import profileUserView from './view/profile-user-view.js';
import CardListPresenter from './presenter/presenter.js';
import { getFilmsData } from './data.js';

import NavigationListView from './view/navigation-list-view.js';
import FiltersView from './view/filter-buttons-view.js';
const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const cardListPresenter = new CardListPresenter();
const filmsData = getFilmsData();

render(new profileUserView(), headerElement);
render(new NavigationListView(), mainElement);
render(new FiltersView(), mainElement);
cardListPresenter.init(mainElement, filmsData);
