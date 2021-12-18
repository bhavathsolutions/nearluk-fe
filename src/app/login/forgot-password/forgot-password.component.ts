import { Forgot } from './../../model/login';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  otpvalue: any;
  updatepassshow1: boolean;
  updatepassshow: boolean;
  userid: any;
  status: any;
  otp: any;
  forgot: Forgot;
  display: boolean = false;
  displayOtp: boolean;

  constructor(
    private ns: NearlukService,
    private toastr: ToastrService,
    private router: Router) {
    this.forgot = new Forgot();
  }

  ngOnInit() {
    this.display = true;
  }

  updatepassword(upassword, upassshow1) {
    if (upassword.value == upassshow1.value) {
      this.ns.verifyupdate(this.otp, this.otpvalue, this.userid, upassword.value).subscribe((data) => {
        if (data.result === true) {
          this.router.navigate(['login']);
          this.toastr.success("Password updated successfully");
        } else {
          this.toastr.error("Unable to update password.please try again");
        }
      });
    } else {
      this.toastr.error("Password mismatch");
    }
  }

  Forgotpwd() {
    this.ns.getotpMobile(this.forgot.mobile).subscribe((data) => {
      this.userid = data.data[0].uid
      if (data.result == true) {
        this.ns.resetpasswordsendotp(this.forgot.mobile).subscribe((data) => {
          if (data.Status === 'Success') {
            this.displayOtp = true;
            this.otp = data.Details;
            this.toastr.success("OTP has been sent to your mobile number");
          } else {
            this.toastr.error("Problem in sending OTP! please try again");
          }
        });
      } else {
        this.toastr.error("Invalid Mobile Number");
      }
    });
  }

  resentOtp(mobile: any) {
    this.ns.resetpasswordsendotp(mobile).subscribe((data) => {
      this.otp = data.Details;
    })
  }

  verifyOtp(otp: any) {
    this.ns.verify(this.otp, otp.value).subscribe((data) => {
      this.status = data.Status
      if (data.Status == "Success") {
        this.otpvalue = otp.value;
        this.updatepassshow = true;
        this.updatepassshow1 = true;
        this.toastr.success('OTP verified successfully..');
      } else {
        this.toastr.error('INVALID OTP');
      }
    });
  }
  cancle() {
    this.router.navigate(['login'])
  }
}