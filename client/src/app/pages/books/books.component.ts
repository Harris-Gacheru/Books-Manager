import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books!: Book[]

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(data => {
      this.books = data
    })
  }

}
