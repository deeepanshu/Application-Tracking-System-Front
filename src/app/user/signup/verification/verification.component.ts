import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Component({
  selector: "app-email-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.css"]
})
export class VerificationComponent implements OnInit {
  loading: boolean = false;
  success: boolean = false;
  contact: string = "";
  showOTPDiv: boolean = false;
  otp: string = "";
  step = 1;
  contactVerificationForm = new FormGroup({
    contact: new FormControl("")
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  increment() {
    this.step++;
  }
  decrement() {
    this.step--;
  }

  ngOnInit() {
    let token = this.route.snapshot.paramMap.get("token");
    this.loading = true;
    if (token) {
      this.authService.validateEmail(token).subscribe(response => {
        console.log(response);
        this.loading = false;
        if (response.success) {
          this.success = true;
          localStorage.setItem("token", response.token);
          if (response.isMobileVerified) {
            this.step = 3;
            return;
          }
          this.step = 2;
          let token = response.token;
          let decoded = helper.decodeToken(token);
          console.log(decoded);
          this.toastr.success("Email Verified");
        }
      });
    }
  }
}
