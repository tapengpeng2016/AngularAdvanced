import { User } from './../../core/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  color: string;
    users$: Observable<User[]> = this.userService.allUsers$;
    constructor(protected userService: UserService) { }

    ngOnInit(): void {

      this.userService.getAllUsers();
      this.userService.search$.subscribe((val) => {
        console.log('in user component', val);
      });

    }

    addUser(): void {
      this.userService.addNewUser({ name: 'hsa', email: 'hsa@gmail.com'});
    }

    deleteUser(id: number): void{
      this.userService.deleteUser(id);
    }
}
