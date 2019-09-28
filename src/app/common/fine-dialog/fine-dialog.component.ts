import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-fine-dialog',
  templateUrl: './fine-dialog.component.html',
  styleUrls: ['./fine-dialog.component.scss']
})
export class FineDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<FineDialogComponent>) { }

  fine: number;
  buttonLabel: string;
  ngOnInit() {
    this.fine = this.data.fine;
    if ( this.fine > 0) {
      this.buttonLabel = 'Settle Fine And Return';
    } else {
      this.buttonLabel = 'Return';
    }
  }

}
