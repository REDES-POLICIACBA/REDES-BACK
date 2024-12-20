import 'dotenv/config'
import connectDB from './config/dataBase'
import indexRouter from './routes/index'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import http from 'node:http'
import { Server as SocketServer } from 'socket.io'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const app = express()

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

const port = process.env.PORT || 3000

io.on('connection', () => {})

connectDB()
server.listen(port, () =>
    console.log(`Servidor corriendo en el port: ${port}!`),
)
export { io }
