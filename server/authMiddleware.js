const authMiddleWare = (req, res, next) => {
    if (req.user) {
        console.log('user auth', req.user);
        res.append('user', JSON.stringify(req.user) );
    }
    next();
}

module.exports = authMiddleWare;