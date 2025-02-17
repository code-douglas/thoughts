import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';
class AuthController {

  static async login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if(!user) {
      req.flash('error', 'Usuário não encontrado, tente novamente!');
      res.render('auth/login');
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if(!passwordMatch) {
      req.flash('error', 'Credenciais invalidas, verifiquei e tente novamente.');
      res.render('auth/login');
      return;
    }

    try {
      req.session.userId = user.id;
      req.flash('success', 'Sucesso ao acessar sua conta!');
      req.session.save(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.log(error);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
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
