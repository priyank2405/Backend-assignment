function logger(req,res, next) {
    console.log(`requested url: ${req.originalUrl}`);
    next();
}

module.exports = logger