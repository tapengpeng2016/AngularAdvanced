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

  getAllUsers(): void{
    this.http.get<User[]>(this.url).subscribe((users) => {
      this._allUsers$.next(users);
    });
  }

   addNewUser(payload: { name: string, email: string}): void{
     this.http
    .post(this.url + '11', payload)
    .pipe(
        tap(() => this.notificationService.success('Utilisateur bien créé !')),
        catchError(() => throwError(() => this.notificationService.error('Erreur'))
          )
        // catchError(() => {
        //   this.notificationService.error('Erreur');
        //   return EMPTY;
        // })
    )
    .subscribe((user: User) => {
        const users = this._allUsers$.value;
        this._allUsers$.next([...users, user]);
    })
   }

   deleteUser(id: number): void {
     this.http.delete(this.url + '/${id}')
     .pipe(
      tap(
        () => this.notificationService.success('Vous avez supprimé un utilisateur'),
        catchError(() => throwError(() => this.notificationService.error('Une erreur est survenue'))
     )))
     .subscribe(() => {
       const users = this._allUsers$.value.filter((u: User) => u.id !== id);
       this._allUsers$.next(users);
     });
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
