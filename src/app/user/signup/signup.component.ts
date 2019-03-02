import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  signup() {
    const user = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    }
    console.log(user);
    this.authService.signUp(user).subscribe((data: SignUp) => {
      console.log(data);
      if (data.success) {
        this.signUpForm.reset();
        this.router.navigate(['/login']);
        this.toastr.success('Sign Up successful!!');
      } else {
      this.toastr.error('SignUp Failed');
      }
    });
  }


  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

}
