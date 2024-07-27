//
import { v4 as uuidv4 } from 'uuid';

export default class BaseDto {
  constructor() {
    this.id = uuidv4();
  }

  static mapper(obj) {
    const instance = new this();
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && key in instance) {
        instance[key] = obj[key];
      }
    }
    return instance;
  }
}