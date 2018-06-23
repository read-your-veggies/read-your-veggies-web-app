const authMiddleWare = (req, res, next) => {
<<<<<<< HEAD
    if (req.user) {
        console.log('user auth', req.user);
        res.append('user', JSON.stringify(req.user) );
    }
    next();
=======
  if (req.user) {
    res.append('user', JSON.stringify(req.user) );
  }
  next();
>>>>>>> dev
}

module.exports = authMiddleWare;