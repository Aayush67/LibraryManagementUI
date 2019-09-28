import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../service/AccountService';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: AccountService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', [Validators.required, Validators.pattern('[1-9][0-9]?[0-9]?'), Validators.maxLength(3)]]
    });
  }

  onRegisterSubmit() {
    const data = {
      name: this.registerForm.controls.name.value,
      address: this.registerForm.controls.address.value,
      phone: this.registerForm.controls.phone.value,
      age: this.registerForm.controls.age.value
    };
    this.registerService.registration(data, this.registerForm.controls.email.value.toString()).subscribe(res => {
      this.toastr.success('Registered Successfully!', 'Registration', {
        timeOut: 3000
      });
      this.router.navigate(['/login']);
    });
  }

 numberOnly(event) {
   return event.keyCode >= 48 && event.keyCode <= 57;
 }
}
