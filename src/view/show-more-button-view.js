import ViewConstructor from './view-constructor.js';


const createShowMoreButtonTemplate = () =>  '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends ViewConstructor {
  constructor() {
    super(() => createShowMoreButtonTemplate);
  }
}
