import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors()) //decidir que frontends podem consumir o backend
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, ()=>{
    console.log('HTTP server running!')
})