import express from 'express'
import mssql from 'mssql'
import sqlConfig from '../config/sqlconfig'
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/books.controller'
import { verifyToken } from '../middleware/verifytoken'

const router = express.Router()

router.post('/create', verifyToken, createBook)
router.get('/books', getBooks)
router.get('/books/:id', verifyToken, getBook)
router.patch('/books/:id', verifyToken, updateBook)
router.delete('/books/:id', verifyToken, deleteBook)

export default router
