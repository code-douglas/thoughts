import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';
class AuthController {
  static async login(req, res) {
    res.render('auth/login');
  }

  static async register(req, res) {
    res.render('auth/register');
  }

  static async registerPost (req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if(password != confirmPassword) {
      req.flash('error', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');
      return;
    }

    const checkIfUserExist = await User.findOne({ where: { email: email } });

    if(checkIfUserExist) {
      req.flash('error', 'Email já está em uso, tente novamente!');
      res.render('auth/register');
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      req.session.userId = createdUser.id;

      req.flash('success', 'Sucesso ao criar conta!');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
