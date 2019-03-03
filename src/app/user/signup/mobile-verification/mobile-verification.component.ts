import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css']
})
export class MobileVerificationComponent implements OnInit {
  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();
  
  contact: string = "";
  showOTPDiv: boolean = false;
  otp: string = "";
  contactEvent(event) {
    this.contact = event.target.value;
  }
  sendOtpEvent(event) {
    if (this.contact.length === 10) {

      this.authService.verifyMobile(this.contact).subscribe(response => {
        if (response.success) {
          this.toastr.success("OTP Sent!");
          this.showOTPDiv = true;
        } else {
          alert("No Success!");
        }
      });
    } else {
      alert("INVALID CONTACT");
    }
  }

  otpEvent(event) {
    this.otp = event.target.value;
    console.log(this.otp);
  }

  verifyOTPEvent(event) {
    console.log(this.otp.length, this.otp);
    if (this.otp.length === 6) {
      this.authService.validateMobile(this.otp).subscribe(response => {
        if (response.success) {
          this.toastr.success("OTP Verified");
          this.increment.emit();
          console.log("response", response.success);
        } else {
          this.toastr.error("Not Verified");
          console.log(response);
        }
      });
    } else {
      alert("INVALID OTP");
    }
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

}
