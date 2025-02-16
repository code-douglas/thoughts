import User from '../models/User.mjs';

export default class ToughtsController {
  static async login(req, res) {
    res.render('auth/login');


  }
  static async register(req, res) {
    res.render('auth/register');
  }
}
