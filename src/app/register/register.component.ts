import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterModel} from '../model/register.model';
import {AccountService} from '../service/AccountService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private registerService: AccountService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });
  }

  onRegisterSubmit() {
    const data = {
      name: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      age: this.registerForm.controls.age.value
    }
    console.log(data);
    this.registerService.registration(data).subscribe(res => {
      console.log('Result', res);
    });
  }

}
