import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<MessageBoxComponent>) { }
 message;
  ngOnInit() {
      this.message = this.data.message;
  }

}
