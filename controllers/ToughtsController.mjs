import Tought from '../models/Tought.mjs';
import User from '../models/User.mjs';

class ToughtsController {

  static showToughts(req, res) {
    res.render('toughts/home');
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    if(!user) {
      req.flash('error', 'Você precisa está logado!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
      return;
    }
    const toughts = user.Toughts.map((result) => result.dataValues);
    res.render('toughts/dashboard', { toughts });
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

export default ToughtsController;
