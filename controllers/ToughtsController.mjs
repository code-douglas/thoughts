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

  static async createToughtSave (req, res) {

    const tought = {
      title: req.body.title,
      UserId: req.session.userId,
    };

    try {
      await Tought.create(tought);
      req.flash('success', 'Pensamento criado com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch(error) {
      console.log(error);
    }

  }
}
