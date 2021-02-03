import { UserService } from './../core/services/user.service';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {

    this.form = this.builder.group({
      email: ['', [Validators.required], [this.userService.checkEmail.bind(this.userService)] ],
      password: []
    });
  }


  login(): void{
    this.authService.login(this.form.value).subscribe((res) =>{
      this.router.navigateByUrl('/');
    });
  }

}
