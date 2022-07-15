import express from 'express'
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/books.controller'
import { verifyToken } from '../middleware/verifytoken'

const router = express.Router()

router.get('/', (req, res) => {res.send('Get books')})
router.post('/create', verifyToken, createBook)
router.get('/books', getBooks)
router.get('/books/:id', verifyToken, getBook)
router.patch('/books/:id', verifyToken, updateBook)
router.delete('/books/:id', verifyToken, deleteBook)

export default router
