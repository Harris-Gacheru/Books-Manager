import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editForm = this.fb.group({
    pages: [ 0, Validators.required],
    image: ['', Validators.required]
  })

  id: string = ''
  msg: string = ''

  constructor(private fb: FormBuilder, private booksService: BooksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })
  }

  onSubmit(){
   console.log( this.editForm.value.image)
   this.booksService.updateBook(this.id, this.editForm.value).subscribe(info => {
      console.log(info)      
   })
  }
}
