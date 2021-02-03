import { tap, map } from 'rxjs/operators';
import { UserService } from './../../core/services/user.service';
import { Observable } from 'rxjs';
import { GetUsers, AddUser, DeleteUser } from './user.action';
import { User } from './../../core/models/user.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";

export interface UserStateModel{
  users: User[];
  loading: boolean;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    loading: false
  }
})
@Injectable()
export class UserState{

  constructor(private userService: UserService){

  }
  @Selector()
  static getUserList(state: UserStateModel){
    return state.users;
  }

  @Action(GetUsers)
  getUsers({getState, setState}: StateContext<UserStateModel>): Observable<any>{
    // const state = context.getState();
    // context.setState(
    //   {
    //     ...state,
    //     users: [
    //       {
    //         id: 1,
    //         name: 'ana',
    //         email:'ana@mail.fr'
    //       }
    //     ],
    //     loading: true
    // });

    return this.userService.getAllUsers()
    .pipe(tap((users: User[]) => {
      const state = getState();
      setState({
        ...state,
        users,
        loading: true
      });

    }));
  }


  @Action(AddUser)
  addUser({getState, setState}: StateContext<UserStateModel>, action: AddUser): Observable<any>{
    return this.userService.addNewUser(action.user)
    .pipe(
      tap((user: User) => {
      const state = getState();
      setState({
        ...state,
        users: [...state.users, user],
        loading: true
      });

    }));
  }


  @Action(DeleteUser)
  deleteUser({getState, setState}: StateContext<UserStateModel>, action: DeleteUser): Observable<any>{
    return this.userService.deleteUser(action.id)
    .pipe(
      tap(() => {
        const state = getState();
        setState({
          ...state,
          users: state.users.filter((u) => u.id !== action.id),
          loading: true
        });
      })
    );
  }
}
