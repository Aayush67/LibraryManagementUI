import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableDialogComponent } from './book-table-dialog.component';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let fixture: ComponentFixture<BookTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
