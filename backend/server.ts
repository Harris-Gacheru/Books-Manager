import express from 'express'

const app = express()
const PORT = 5690

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})