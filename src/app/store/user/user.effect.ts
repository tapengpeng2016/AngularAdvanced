import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from './../../core/models/user.model';
import { NotificationService } from './../../core/services/notification.service';
import { UserService } from './../../core/services/user.service';
import { addUserSuccess, deleteSuccess, getUsersSuccess, UserActions } from './user.action';


@Injectable({providedIn: 'root'})
export class UserEffect {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetAll),
      switchMap(() => {
       return this.userService.getAllUsers()
        .pipe(
          map((users: User[]) => getUsersSuccess({users}))
        );
      }
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.AddUser),
      switchMap((action: {type: string, user: any}) => {
            return this.userService.addNewUser(action.user).pipe(
            map((user: User) => addUserSuccess({user})),
            tap(() => this.notificationService.success('Utilisateur bien créé !'))
            // catchError(() => throwError(() => this.notificationService.error('Erreur')))
            );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.delete),
      switchMap((action: {type: string, id: number}) => {
        return this.userService.deleteUser(action.id).pipe(
        map(() => deleteSuccess({id: action.id})),
        tap(() => this.notificationService.success('Utilisateur bien supprimé !'))
        // catchError(() => throwError(() => this.notificationService.error('Erreur')))
        );
  })
    );
  });



  constructor(
    private actions$: Actions,
    private userService: UserService,
    private notificationService: NotificationService
    ){

  }
}
