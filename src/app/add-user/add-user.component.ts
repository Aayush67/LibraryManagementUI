import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../service/AccountService';
import {MessageBoxComponent} from '../common/message-box/message-box.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUSerForm: FormGroup;
  userId: number;
  buttonLabelAddUpdate: string;
  buttonLabelShowCancel: string;
  userInfoId: number;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,private router: Router,
              private dialog: MatDialog, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.addUSerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', [Validators.required, Validators.pattern('[1-9][0-9]?[0-9]?'), Validators.maxLength(3)]]
    });
    this.userId = this.route.snapshot.params.userId;
    this.buttonLabelAddUpdate = 'Add';
    this.buttonLabelShowCancel = 'Show Users';
    if (this.userId !== undefined) {
      this.accountService.getUserById(this.userId).subscribe( res => {
        this.addUSerForm.patchValue({ name: res.responseData.name});
        this.addUSerForm.patchValue({ email: res.responseData.email});
        this.addUSerForm.patchValue({ phone: res.responseData.phone});
        this.addUSerForm.patchValue({ age: res.responseData.age});
        this.addUSerForm.patchValue({ address: res.responseData.address});
        this.userInfoId = res.responseData.userInfoId;
        this.buttonLabelAddUpdate = 'Update';
        this.buttonLabelShowCancel = 'Cancel';
        console.log('res',res);
      });
    }
    console.log('aa', this.route.snapshot.params.name);
  }

  addUser() {
    console.log('student', this.addUSerForm);
    const data = {
      name: this.addUSerForm.controls.name.value,
      address: this.addUSerForm.controls.address.value,
      phone: this.addUSerForm.controls.phone.value,
      age: this.addUSerForm.controls.age.value,
    };
    if(!this.userId) {
      this.accountService.registration(data, this.addUSerForm.controls.email.value.toString()).subscribe(res => {
        this.toastr.success('User Registered Successfully!', 'Registration', {
          timeOut: 3000
        });
        this.addUSerForm.reset();
      });
    } else {
        data['userId'] = this.userId;
        data['userInfoId'] = this.userInfoId;
        console.log('aa',data);
      this.accountService.registration(data, this.addUSerForm.controls.email.value.toString()).subscribe(res => {
        this.toastr.success('User Updated Successfully!', 'Updation', {
          timeOut: 3000
        });
        this.addUSerForm.reset();
        this.router.navigate(['userList']);
      });
    }

  }

  numberOnly(event) {
    return event.keyCode >= 48 && event.keyCode <= 57;
  }
}
