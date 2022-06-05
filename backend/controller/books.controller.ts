import { v1 as uid } from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/sqlconfig'
import { RequestHandler } from "express"

export const createBook: RequestHandler = async(req, res) => {
    try {
        const id = uid()
        const {name, pages, image, author} = req.body as {name: string, pages: number, image: string, author: string}

        let pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('id', mssql.VarChar, id)
        .input('name', mssql.VarChar, name)
        .input('pages', mssql.VarChar, pages)
        .input('image', mssql.VarChar, image)
        .input('author', mssql.VarChar, author)
        .execute('createBook')

        res.json({message: 'Book created successfully'})

    } catch (error: any) {
        res.json({error: error.message})
    }
}

export const getBooks: RequestHandler = async(req, res) => {
    try {
        let pool = await mssql.connect(sqlConfig)
        const books = await pool.request().execute('getbooks')

        res.json(books.recordset)
    } catch (error: any) {
        res.json({error: error.message})
    }

}

export const getBook: RequestHandler<{id: string}> = async(req, res) => {
    try {
        const id = req.params.id

        let pool = await mssql.connect(sqlConfig)
        const book = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getbook')

        if (!book.recordset[0]) {
            res.json({message: `Book with id ${id} does not exist`})
        }
        res.json(book.recordset)
    } catch (error: any) {
        res.json({error: error.message})
    }
}

export const updateBook: RequestHandler<{id: string}> = async(req, res) => {
    try {
        const id = req.params.id
        const {pages, image} = req.body as {pages: number, image: string}

        let pool = await mssql.connect(sqlConfig)
        const book = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getbook')

        if (book.recordset[0]) {
            await pool.request()
            .input('id', mssql.VarChar, id)
            .input('pages', mssql.Int, pages)
            .input('image', mssql.VarChar, image)
            .execute('updatebook')  

            res.json({message: 'Updated successfully'})
        } else {
            res.json({message: `Book with id ${id} does not exist`})            
        }  
        
    } catch (error: any) {
        res.json({error: error.message})
    }
}

export const deleteBook: RequestHandler<{id: string}> = async(req, res) => {
    try {
        const id = req.params.id

        let pool = await mssql.connect(sqlConfig)
        let book = await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('getbook')

        if (book.recordset[0]) {
            await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('deletebook')
            
            res.json({message: 'Deleted successfully'})
        } else {
            res.json({message: `Book with id ${id} does not exist`})
        }
    } catch (error: any) {
        res.json({error: error.message})
    }    
}