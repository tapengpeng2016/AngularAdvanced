import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './../models/user.model';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class UserService{

  // état
  private _search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

 private _allUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  get allUsers$(): Observable<User[]> {
    return this._allUsers$.asObservable();
  }


  private _newUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  get newUser$(): Observable<User>{
    return this._newUser$.asObservable();
  }


  constructor(
    protected http: HttpClient,
    @Inject('BASE_URL') private url: string,
    private notificationService: NotificationService ){
    this.url += '/users';
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

   addNewUser(payload: User): Observable<User> {
    return this.http
    .post(this.url, payload);
        // catchError(() => {
        //   this.notificationService.error('Erreur');
        //   return EMPTY;
        // })

    // .subscribe((user: User) => {
    //     const users = this._allUsers$.value;
    //     this._allUsers$.next([...users, user]);
    // })
   }

   deleteUser(id: number): Observable<void> {
     return this.http.delete<void>(this.url + '/${id}');
    //  .pipe(
    //   tap(
    //     () => this.notificationService.success('Vous avez supprimé un utilisateur'),
    //     catchError(() => throwError(() => this.notificationService.error('Une erreur est survenue'))
    //  )))

   }


  // getter
  get search$(): Observable<string>{
    return this._search$.asObservable();
  }

  // mutation
  setSearch(value: string): void{
    this._search$.next(value);
  }



  checkEmail(input: FormControl): Observable<null | {emailExists: boolean}>{
    return this.http.get<User>(this.url + '/1')
    .pipe(
      map((user: User) => {
        return input.value == user.email ? {emailExists: true} : null;
      })
    );
  }

}
