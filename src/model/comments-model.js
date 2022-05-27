import { generateComment } from '../fishmock/comment.js';

export default class CommentModel {
  #commentsArr = Array.from({ length: 5 }, generateComment);
  get comments () {
    return this.#commentsArr;
  }
}
