import {createElement} from '../render';
class ViewConstructor {
  #element = null;
  constructor(createTemplate) {
    this.createTemplate = createTemplate;
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  getTemplate() {
    return this.createTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ViewConstructor;
