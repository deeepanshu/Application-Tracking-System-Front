import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });


  signup() {
    const user = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    }
    console.log(user);
    this.authService.signUp(user).then((data: SignUp) => {
      console.log(data);
      if (data.success) {
        this.router.navigate(['/login']);
        this.signUpForm.reset();
      } else {
        alert('SignUp Failed');
      }
    });
  }


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
