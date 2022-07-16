import express from 'express'
import mssql from 'mssql'
import sqlConfig from '../config/sqlconfig'
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/books.controller'
import { verifyToken } from '../middleware/verifytoken'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send('Getting books')
    try {
        let pool = await mssql.connect(sqlConfig)
        const books = await pool.request().execute('getbooks')

        if (!books.recordset[0]) {
            res.json({message: 'No books available'})
        }
        res.json(books.recordset).send('Books')
    } catch (error: any) {
        res.json({error: error.message})
    }
})
router.post('/create', verifyToken, createBook)
router.get('/books', getBooks)
router.get('/books/:id', verifyToken, getBook)
router.patch('/books/:id', verifyToken, updateBook)
router.delete('/books/:id', verifyToken, deleteBook)

export default router
