class AuthController {
  static async login(req, res) {
    res.render('auth/login');
  }

  static async register(req, res) {
    res.render('auth/register');
  }
}

export default AuthController;
