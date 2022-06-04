import express from 'express'
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/books.controller'

const router = express.Router()

router.post('/create', createBook)
router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.patch('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)