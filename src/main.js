import { render } from './framework/render.js';
import profileUserView from './view/profile-user-view.js';
import CardListPresenter from './presenter/card-list-presenter.js';
import { getFilmsData } from './data.js';
import { generateFilter } from './fishmock/filtr.js';

import NavigationListView from './view/navigation-list-view.js';
import FiltersView from './view/filter-buttons-view.js';
const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const cardListPresenter = new CardListPresenter();
const filmsData = getFilmsData();
const filters = generateFilter(filmsData.films);

render(new profileUserView(), headerElement);
render(new NavigationListView(filters), mainElement);
render(new FiltersView(), mainElement);

//render(new FiltersView(filters), mainElement);
cardListPresenter.init(mainElement, filmsData);
