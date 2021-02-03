import { User } from './../../core/models/user.model';
import { createAction, props } from "@ngrx/store";

export enum UserActions  {
  GetAll = '[Users] Load Users',
  GetAllSuccess = '[Users] Load Users success',

  AddUser = '[Users] Add user',
  AddUserSuccess= '[Users] Add new user success',

  delete = '[UseUsersr] Delete user',
  DeleteSuccess= '[Users] Delete user success',
}
// export const getUsers = () => {
//   return {
//     type: UserActions.GetAll
//   };
// }

export const getUsers = createAction(UserActions.GetAll);
export const getUsersSuccess = createAction(UserActions.GetAllSuccess,
  props<{
  users: User[]
}>());




export const addNewUser = createAction(UserActions.AddUser,  props<{user: User}>());

export const addUserSuccess = createAction(UserActions.AddUserSuccess, props<{user: User}>());

export const deleteUtilisateur = createAction(UserActions.delete, props<{id: number}>());

export const deleteSuccess = createAction(UserActions.DeleteSuccess, props<{id: number}>());
