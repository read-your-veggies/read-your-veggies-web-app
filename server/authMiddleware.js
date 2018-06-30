const authMiddleWare = (req, res, next) => {
  if (req.user) {
    console.log('from middleware', req.user)
    res.append('user', JSON.stringify(req.user) );
  }
  next();
}

module.exports = authMiddleWare;