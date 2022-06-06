import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book!: Book
  id: string = ''
  msg: string = ''
  error: string = ''
  editForm!: FormGroup 
  
  constructor(private fb: FormBuilder, private booksService: BooksService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      
      this.booksService.getBook(this.id).subscribe(data => {
        this.book = data

        this.editForm = this.fb.group({
          name: [this.book.name, Validators.required],
          pages: [this.book.pages , Validators.required],
          image: [this.book.image],
          author: [this.book.author, Validators.required],
          description: [this.book.description, Validators.required]
        })
      })
    })
  }

  onSubmit(){
   console.log( this.editForm.value.image)
   this.booksService.updateBook(this.id, this.editForm.value).subscribe(
    (res) => {
      this.msg = res.message
      this.error = ''
        
      setTimeout(() => {
        this.router.navigate([`/books/${this.id}`])          
      }, 1200);
    },
    (error) => {
      this.error = error.error
    }
   )
  }
}
