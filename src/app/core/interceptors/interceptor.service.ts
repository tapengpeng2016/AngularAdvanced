import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InterceptorService implements HttpInterceptor
{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authService.token){
      return next.handle(req);
    }
    const headers = new HttpHeaders({ authorization: this.authService.token});
    const newReq = req.clone({headers});
    return next.handle(newReq);
  }

}
