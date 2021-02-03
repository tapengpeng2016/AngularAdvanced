import { UserState } from './../../store/user/user.state';
import { GetUsers, AddUser, DeleteUser } from './../../store/user/user.action';
import { User } from './../../core/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core'
import { Select, Selector, Store } from '@ngxs/store';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  color: string;
    @Select(UserState.getUserList)  users$: Observable<User[]>;

    constructor(protected userService: UserService,
                private store: Store) { }

    ngOnInit(): void {
      this.store.dispatch(new GetUsers());

      this.userService.search$.subscribe((val) => {
        console.log('in user component', val);
      });

    }

    addUser(): void {
      this.store.dispatch(new AddUser({ name: 'hsa', email: 'hsa@gmail.com'}));

      // this.userService.addNewUser({ name: 'hsa', email: 'hsa@gmail.com'});
    }

    deleteUser(id: number): void{
      this.store.dispatch(new DeleteUser(id));
    }
}
