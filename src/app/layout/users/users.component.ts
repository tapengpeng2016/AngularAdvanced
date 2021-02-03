import { getUserLoading } from './../../store/user/user.selector';
import { getUsers, addNewUser, deleteUtilisateur } from './../../store/user/user.action';
import { User } from './../../core/models/user.model';
import { Observable } from 'rxjs';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/user/user.reducer';
import { getUserList } from 'src/app/store/user/user.selector';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  color: string;
    users$: Observable<User[]> = this.store.select(getUserList);
    loading = this.store.select(getUserLoading);

    constructor(protected userService: UserService, private store: Store<{user: State}>) { }

    ngOnInit(): void {


      //action
      this.store.dispatch(getUsers());

      this.userService.search$.subscribe((val) => {
        console.log('in user component', val);
      });

    }

    addUser(): void {
      this.store.dispatch(addNewUser({user: { name: 'hsa', email: 'hsa@gmail.com'}}));
    }

    deleteUser(id: number): void{
      this.store.dispatch(deleteUtilisateur({id}));
    }
}
