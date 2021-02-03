import { Injectable } from '@angular/core';
import { Notyf } from 'Notyf';
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Notyf{

  constructor() {
    super({
      position:{
        x: 'left',
        y: 'bottom'
      }
    });
  }
}
