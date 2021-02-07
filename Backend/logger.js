export default (app) => {
    app.use((req, res, next) => {
        let log = {
            time: new Date().toLocaleString(),
            header: req.headers,
            url: req.url,
            method: req.method
        }
        console.log(log);
        next();
    });
}