import Tought from '../models/Tought.mjs';
import User from '../models/User.mjs';

import { Op } from 'sequelize';

class ToughtsController {

  static async showToughts(req, res) {

    let search = '';

    if (req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';
    if(req.query.order === 'old') {
      order = 'ASC';
    } else {
      order = 'DESC';
    }

    try {
      const toughtsData = await Tought.findAll({
        include: User,
        where: {
          title: { [Op.like]: `%${search}%` },
        },
        order: [['createdAt', order]],
      });

      const toughts = toughtsData.map(
        (result) => result.get(
          { plain: true }
        )
      );

      let toughtsQty = toughts.length;
      if(toughtsQty === 0) toughtsQty = false;

      res.render('toughts/home', { toughts, search, toughtsQty });
    } catch (error) {
      console.log(error);
    }
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

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userId;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId  } });
      req.flash('success', 'Pensamento excluido com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });

    res.render('toughts/edit', { tought });
  }

  static async editToughtSave(req, res) {
    const { id, title } = req.body;

    const tought = {
      id: id,
      title: title,
    };

    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash('success', 'Pensamento editado com sucesso!');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ToughtsController;
