const checkUserAuth = function(req, res, next) {
  const UserId = req.session.userId;
  console.log(UserId);

  if(!UserId) {
    return res.redirect('/login');
  }
  next();
};

export default checkUserAuth;
