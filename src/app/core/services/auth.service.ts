import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
type TokenObject= {token: string};

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  readonly loginUrl = 'https://reqres.in/api/login';
  constructor(private httpClient: HttpClient){

  }


  set token(val: string){
    localStorage.setItem('token', val);
  }

  get token(): string{
    return localStorage.getItem('token');
  }
  login(payload: {email: string, password: string}): Observable<TokenObject>{
    return this.httpClient
    .post<TokenObject>(this.loginUrl, payload)
    .pipe(
      tap(({token}: TokenObject) => {
        this.token = token;
      })
    );
  }
}
