import express from 'express'
import router from './routes/books.routes'
import auth_router from './routes/users.routes'
import cors from 'cors'

const app = express()
const apiRoute = '/api'
const PORT = process.env.PORT || 5690

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {res.send('Welcome to books manager')})
app.use(apiRoute, router)
app.use(apiRoute, auth_router)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})