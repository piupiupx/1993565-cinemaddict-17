import { render } from './render.js';
import profileUserView from './view/profile-user-view.js';
import CardListPresenter from './presenter/presenter.js';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const cardListPresenter = new CardListPresenter();

render(new profileUserView(), headerElement);
cardListPresenter.init(mainElement);
