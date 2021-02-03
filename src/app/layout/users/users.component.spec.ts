import { UserService } from './../../core/services/user.service';
import { User } from './../../core/models/user.model';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UsersComponent } from './users.component';
import { Observable, of } from 'rxjs';
import { ok } from 'assert';

class UserServiceMock{
   getAllUsers(): Observable<HttpResponse<User[]>>{
    return of(new HttpResponse({ body:  [
      {
         id: 1,
         name: 'test1',
         email: 'test@mail.fr'
       } as User
      ] , status: 200 }));
   }
}
describe('Tester userComponent', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let tpl: HTMLElement;
  beforeEach(async () => {
   await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientModule],
      providers: [{
        provide: UserService,
        useClass: UserServiceMock
      }]
    }).compileComponents();
  });

  beforeEach(async () => {
     fixture = TestBed.createComponent(UsersComponent);
     component = fixture.componentInstance;
     tpl = fixture.nativeElement;
    // il faut déclencher le cycle de vie, dont ngOnit
     fixture.detectChanges();
    // fait la requête et attendre que le tableau soit rempli
     await fixture.whenStable();
    // une fois les données récupérées, il faut remplir l'html en déclenchant le changement
     fixture.detectChanges();
  });

  it('Tester le nbr de div === taille du tableau', () => {
    const cards = tpl.querySelectorAll('app-user-card');
    expect(component.users.length).toBe(cards.length);
  });
});
