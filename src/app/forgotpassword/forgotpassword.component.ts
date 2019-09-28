import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ForgotpasswordComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    // this.dialogRef.updateSize('25%', '40%');
    this.forgotPasswordForm = this.fb.group({
      email: ['' , [Validators.required, Validators.email]]
    });
  }
  reset() {
    this.dialogRef.close(this.forgotPasswordForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
