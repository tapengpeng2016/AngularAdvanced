import { User } from './../../core/models/user.model';
export class GetUsers {
  static readonly type = '[User] Load users';


}

export class AddUser{
  static readonly type = '[User] Add user';
  constructor(public user: User){

  }
}

export class DeleteUser{
  static readonly type = '[User] delete user';
  constructor(public id: number){

  }
}
