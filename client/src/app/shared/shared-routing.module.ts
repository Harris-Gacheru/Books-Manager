import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AddBooksComponent } from '../pages/add-books/add-books.component';
import { BooksComponent } from '../pages/books/books.component';
import { EditBookComponent } from '../pages/edit-book/edit-book.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ViewBookComponent } from '../pages/view-book/view-book.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'books', component: BooksComponent, canActivate: [AuthGuard]},
  {path: 'books/:id', component: ViewBookComponent, canActivate: [AuthGuard]},  
  {path: 'books/edit/:id', component: EditBookComponent, canActivate: [AuthGuard]},
  {path: 'add-books', component: AddBooksComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
