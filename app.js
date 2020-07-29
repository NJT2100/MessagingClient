import app from './express'
import config from './config/config'

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info(`Server listening on port ${config.port}`)
})