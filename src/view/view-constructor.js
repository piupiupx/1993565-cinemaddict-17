import {createElement} from '../render';
class ViewConstructor {
  #element = null;

  constructor(createTemplate) {
    this.createTemplate = createTemplate;
  }

  get template() {
    return this.createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export default ViewConstructor;
