import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import config from './config/config'

const app = express()
const _dirname = process.cwd()

//Read statoc files
app.use('/dist', express.static(path.join(_dirname, 'dist')))
app.use('/client', express.static(path.join(_dirname, 'client')))

//Apply middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(session(config.session))

//Client routing
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client/index.html'))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app