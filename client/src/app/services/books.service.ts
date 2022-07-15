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
    return this.http.post<any>('https://books-manager-b.herokuapp.com/api/create', book)
  }

  getBooks(){
    return this.http.get<Book[]>('https://books-manager-b.herokuapp.com/api/books')
  }

  getBook(id: string){
    return this.http.get<Book>(`https://books-manager-b.herokuapp.com/api/books/${id}`)
  }

  updateBook(id: String, bookdetails: {pages: number, image: string}){
    return this.http.patch<any>(`https://books-manager-b.herokuapp.com/api/books/${id}`, bookdetails)
  }

  deleteBook(id: string){
    return this.http.delete(`https://books-manager-b.herokuapp.com/api/books/${id}`)
  }
}
