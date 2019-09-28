import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../service/AccountService';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  bookId: number;
  buttonLabelAddUpdate: string;
  buttonLabelShowCancel: string;
  updateBookRespose;
  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router,
              private dialog: MatDialog, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.addBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      publication: ['', [Validators.required]],
      author: ['', [Validators.required]],
      published_year: ['', [Validators.required, Validators.pattern('[1-9][0-9][0-9][0-9]'), Validators.maxLength(4)]],
    });
    this.bookId = this.route.snapshot.params.bookId;
    this.buttonLabelAddUpdate = 'Add';
    this.buttonLabelShowCancel = 'Show Books';
    if (this.bookId !== undefined) {
      this.bookService.getBookById(this.bookId).subscribe( res => {
        this.updateBookRespose = res.responseData;
        this.addBookForm.patchValue({ name: res.responseData.name});
        this.addBookForm.patchValue({ publication: res.responseData.publication});
        this.addBookForm.patchValue({ author: res.responseData.author});
        this.addBookForm.patchValue({ published_year: res.responseData.published_year});
        this.buttonLabelAddUpdate = 'Update';
        this.buttonLabelShowCancel = 'Cancel';
        console.log('res',res);
      });
    }
    console.log('aa', this.route.snapshot.params.name);
  }

  addBook() {
    console.log(this.addBookForm);
    const data = {
      name: this.addBookForm.controls.name.value,
      publication: this.addBookForm.controls.publication.value,
      author: this.addBookForm.controls.author.value,
      published_year: this.addBookForm.controls.published_year.value,
    };
    if(!this.bookId) {
      this.bookService.addBook(data).subscribe(res => {
        this.toastr.success('Book Added Successfully!', 'Message!', {
          timeOut: 3000
        });
        this.addBookForm.reset();
      });
    } else {
      data['id'] = this.bookId;
      data['issueDate'] = this.updateBookRespose.issueDate;
      data['returnDate'] = this.updateBookRespose.returnDate;
      data['status'] = this.updateBookRespose.status;


      console.log('aa',data);
      this.bookService.addBook(data).subscribe(res => {
        this.toastr.success('Book Updated Successfully!', 'Updation', {
          timeOut: 3000
        });
        this.addBookForm.reset();
        this.router.navigate(['bookList']);
      });
    }
  }

  numberOnly(event) {
    return event.keyCode >= 48 && event.keyCode <= 57;
  }
}
