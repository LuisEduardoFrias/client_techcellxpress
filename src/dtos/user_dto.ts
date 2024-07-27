//
import BaseDto from './base_dto';

export default class UserDto extends BaseDto {
  #lastName;
  #name;
  constructor(id, name, lastName, email, user) {
    super();
    this.id = id;
    this.fullName = `${name} ${lastName}`;
    this.email = email;
    this.user = user;
  }
}