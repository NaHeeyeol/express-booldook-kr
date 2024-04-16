const { alert } = require('../modules/util');

const isAdmin = (_status = '8', type = '') => {
  return (req, res, next) => {
    if (req.originalUrl.includes('/auth/login')) next();
    else if (req.user && _status <= req.user.status) next();
    else if (!req.user && req.originalUrl.includes('/admin')) res.redirect('/admin/auth/login');
    else {
      let obj = { msg: '권한이 없습니다. 로그인 후 이용하세요.', loc: '/admin/auth/login' };
      req.logout(err => console.log(err));
      req.session.destroy();
      req.user = null;
      res.locals.user = null;
      if (type === 'API') res.status(401).json(obj);
      else res.send(alert(obj.msg, obj.loc));
    }
  };
};

const isGuest = (req, res, next) => {
  if (req.user) res.send(alert('로그인 상태 입니다.'));
  else next();
};

const isUser = (req, res, next) => {
  if (req.user) res.send(alert('로그인 상태 입니다.'));
  else {
    req.logout(err => console.log(err));
    req.session.destroy();
    req.user = null;
    res.locals.user = null;
    res.send(alert('권한이 없습니다. 회원이시면 로그인 후 이용하세요.', '/'));
  }
};

module.exports = { isAdmin, isGuest, isUser };
