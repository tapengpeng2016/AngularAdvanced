import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AppService{
   private _title$: BehaviorSubject<string> = new BehaviorSubject<string>('Mon App');

  get title$(): Observable<string>{
    return this._title$.asObservable();
  }

  setTitle$(value: string): void{
    this._title$.next(value);
  }


}
