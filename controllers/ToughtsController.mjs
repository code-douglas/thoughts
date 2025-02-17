import Tought from '../models/Tought.mjs';
import User from '../models/User.mjs';

export default class ToughtsController {
  static async showToughts(req, res) {
    res.render('toughts/home');
  }
  static async dashboard(req, res) {
    res.render('toughts/dashboard');
  }

  static createTought (req, res) {
    res.render('toughts/create');
  }

}
