const logger = (req, res, next) => {
    console.log(`URL:${req.url} , method:${req.method} , Time:${new Date().toLocaleTimeString()}`)
    next();
}
module.exports = { logger };