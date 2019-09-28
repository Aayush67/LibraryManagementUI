import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {RegisterModel} from '../model/register.model';
import {ForgotpasswordComponent} from '../forgotpassword/forgotpassword.component';
import {AccountService} from '../service/AccountService';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageBoxComponent} from '../common/message-box/message-box.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private toastr: ToastrService, private router: Router,  private loginService: AccountService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    // router.events.subscribe((e) => { console.log('LOGINN')})
  }

  ngOnInit() {

 /*   this.toastr.success('Hello world!', 'Toastr fun!', {
      timeOut: 200000
    });*/
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ForgotpasswordComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
        this.loginForm.reset();
        // this.loginForm.controls.email.ma
        // console.log("closed");
        Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.controls[key].setErrors(null);
      });
    });
  }

  onLogin() {
    if(this.loginForm.valid) {
      const data = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
      this.loginService.login(data).subscribe(res => {
        if (res.responseCode === 1000) {
          this.toastr.success('Successfully Logged In!', 'Login', {
            timeOut: 3000
          });
          localStorage.setItem('username', res.response.credentials.username);
          localStorage.setItem('email', res.response.credentials.email);
          localStorage.setItem('userId', res.response.credentials.userId);
          localStorage.setItem('userType', res.response.credentials.role[0])
          this.router.navigate(['/welcome']);
        } else {
          localStorage.clear();
          this.toastr.error('Invalid Credentials!', 'Login', {
            timeOut: 3000
          });
        }
        console.log('Result', res);
      }, (error: HttpErrorResponse) => {
        this.toastr.error('Invalid Credentials!', 'Login', {
          timeOut: 3000
        });
        console.log('Result', error);

      });
    }
    else
    {
      console.log("Invalid form");
    }
  }


  home()  {
    this.loginService.home().subscribe(res => {
      console.log('Result', res);
    }, error1 => {
      console.log('No Result',error1);
    });
  }
}
