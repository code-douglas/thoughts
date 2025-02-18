const checkUserAuth = function(req, res, next) {
  const UserId = req.session.userId;

  if(!UserId) {
    return res.redirect('/login');
  }
  next();
};

export default checkUserAuth;
