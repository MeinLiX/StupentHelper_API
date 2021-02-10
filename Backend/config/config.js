const config = {}

config.session = {
    secret: "my-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    }
};

config.app = {
    port: 4000
};

config.cors={
    origin: "http://meinlix.tk:3000",
    credentials: true
}

config.db  = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "mydb",
    dialect: "mysql",
    logging: false
};

export default config;
