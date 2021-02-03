import { User } from './../../../core/models/user.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';


describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let tpl: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      name: 'user 1',
      email: 'user1@mail.fr'
    } as User;
    fixture.detectChanges();
    tpl = fixture.nativeElement;
  });

  it('Afficher les infos d\'un utilisateur', () => {
    const cardtitle = tpl.querySelector('.card-title');
    const cardtext = tpl.querySelector('.card-text');
    expect(cardtitle.textContent).toBe(component.user.name);
    expect(cardtext.textContent).toBe(component.user.email);
  });

});
