const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 9001,
    session: {
        secret: 'sample secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }
}

export default config