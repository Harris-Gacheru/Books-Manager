import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = []

  constructor(private http: HttpClient) { }

  addBook(book: Book){
    return this.http.post<Book>('http://localhost:5690/bm/create', book)
  }

  getBooks(){
    return this.http.get<Book[]>('http://localhost:5690/bm/books')
  }

  getBook(id: string){
    return this.http.get<Book>(`http://localhost:5690/bm/books/${id}`)
  }

  updateBook(id: String, bookdetails: {pages: number, image: string}){
    return this.http.patch(`http://localhost:5690/bm/books/${id}`, bookdetails)
  }

  deleteBook(id: string){
    return this.http.delete(`http://localhost:5690/bm/books/${id}`)
  }
}
