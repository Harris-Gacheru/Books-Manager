import { RequestHandler } from "express";
import { v1 as uid } from 'uuid'
import jwt from 'jsonwebtoken'
import mssql from 'mssql'
import sqlConfig from "../config/sqlconfig";

export const register: RequestHandler = async(req, res) => {
    try {
        const id = uid()
        const { username, email, password } = req.body as {username: string, email: string, password: string}

        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('getuser')

        if (user.recordset[0]) {
            res.status(400).json({message: `User already exists`})
        } else {
            await pool.request()
            .input('id', mssql.VarChar, id)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, password)
            .execute('registeruser')

            res.status(200).json({message: 'User created successfully'})
        }

    } catch (error: any) {
        res.json({error: error.message})
    }
}

export const login: RequestHandler = async(req, res) => {
    try {
        const { email, password } = req.body as { email: string, password: string }

        let pool = await mssql.connect(sqlConfig)
        const user = await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('getuser')

        if (user.recordset[0]) {
            if (user.recordset[0].password === password) {
                const payload = await pool.request().query(`select username, email from users where email = '${email}'`)

                const token = jwt.sign(payload, process.env.SECRET_KEY as string)

                res.status(200).json({message: 'Logged in successfully', user: user.recordset[0], token: token})
            }else{
                res.status(400).send({message: 'Invalid credentials'})
            }
        } else {
            res.status(400).send({message: 'Invalid credentials'})
        }
    } catch (error: any) {
        res.json({error: error})
    }
    
}