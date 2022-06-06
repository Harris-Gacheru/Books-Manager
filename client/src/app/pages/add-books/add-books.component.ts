import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  addbookForm = this.fb.group({
    name: ['', Validators.required],
    pages: [0 , Validators.required],
    image: [''],
    author: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private booksService: BooksService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.addbookForm.value)
    this.booksService.addBook(this.addbookForm.value).subscribe(info => {
      console.log(info)
    })
  }

}
