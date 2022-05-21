import ViewConstructor from './view-constructor.js';


const createFilmsListTemplate = () =>
  '<div class="films-list__container"></div>';


export default class FilmsListView extends ViewConstructor {
  constructor() {
    super(createFilmsListTemplate);
  }
}
