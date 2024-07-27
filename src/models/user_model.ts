//
import BaseModel from './base_model';

export default class UserModel extends BaseModel {
  constructor(name, lastName, email, user, password) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.user = user;
    this.password = password;
  }
}