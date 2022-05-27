import { generateComment } from '../fishmock/comment.js';
const COMMENT_QUANTITY = 5;
export default class CommentModel {
  #commentsArr = Array.from({ length:COMMENT_QUANTITY}, generateComment);
  get comments () {
    return this.#commentsArr;
  }
}
