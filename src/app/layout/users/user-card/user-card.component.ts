import { User } from './../../../core/models/user.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Output() delete = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteUser(id: number): void{
    if (id){
      this.delete.emit(id);
    }

  }

}
