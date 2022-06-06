import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  book?: Book
  id: string = ''

  constructor(private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']

      this.booksService.getBook(this.id).subscribe(data => {
        this.book = data

        console.log(this.book.image)
      })
    })
  }

  delete(id: string){
    console.log(id)
    this.booksService.deleteBook(id).subscribe(info => {
      console.log(info)
    })
  }

}
