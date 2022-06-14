import { generateComment } from '../fishmock/comment.js';
import {getRandomInteger} from '../util.js';
export default class CommentModel {
  #commentsArr = Array.from({length: getRandomInteger(0, 20)}, (_, i) => generateComment(i));
  get comments () {
    return this.#commentsArr;
  }
}
