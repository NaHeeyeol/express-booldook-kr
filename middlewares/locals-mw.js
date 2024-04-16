const linkInit = require('../modules/link-init');

const { Cate, BoardInit } = require('../models');

module.exports = async (req, res, next) => {
  if (req.user) {
    res.locals.user = {
      id: req.user.id,
      userid: req.user.userid,
      username: req.user.username,
      email: req.user.email,
      status: req.user.status,
      grade: req.user.grade,
    };
  }
  else {
    res.locals.user = null;
  }
  res.locals.pretty = true;
  res.locals.adminTitle = process.env.ADMIN_TITLE || '';
  res.locals.init = linkInit.admin;
  res.locals.current = req.path;
  res.locals.currents = req.path.split('/');
  res.locals.currents.shift();
  res.locals.second = '/' + res.locals.currents[0];
  res.locals.second += res.locals.currents[1] ? '/' + res.locals.currents[1] : '';

  const cateRaw = await Cate.getChildren({ cid: 'j1_2' });
  const reviewRaw = await Cate.getChildren({ cid: 'j1_3' });
  const boardRaw = await BoardInit.findAll( { attributes: ['id', 'title'], order: [['id', 'asc']] });

  res.locals.nav = {};
  res.locals.nav.cate = cateRaw.childTree.map(v => ({ id: v.id, name: v.text }));
  res.locals.nav.review = reviewRaw.childTree.map(v => ({ id: v.id, name: v.text }));
  res.locals.nav.board = boardRaw.map(v => ({ id: v.id, name: v.title }));

  next();
};

/*
path : {
  current: 현재경로
  currents: 경로 배열
  second: 2depth 경로
}
*/
