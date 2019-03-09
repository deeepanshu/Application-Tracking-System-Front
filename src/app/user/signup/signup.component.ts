import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { patternValidator } from "./../../pattern-validator";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  signup() {
    const user = {
      name: this.signUpForm.get("name").value,
      email: this.signUpForm.get("email").value,
      password: this.signUpForm.get("password").value
    };
    console.log(user);
    this.authService.signUp(user).subscribe((data: SignUp) => {
      console.log(data);
      if (data.success) {
        this.signUpForm.reset();
        this.router.navigate(["/login"]);
        this.toastr.success("Sign Up successful!!");
      } else {
        this.toastr.error("SignUp Failed");
      }
    });
  }

  loginRoute() {
    this.router.navigate(["login"]);
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        patternValidator(
          /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });
  }
}
