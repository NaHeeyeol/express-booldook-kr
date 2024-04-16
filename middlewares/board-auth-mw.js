const { alert } = require('../modules/util');

const isList = (req, res, next) => {
  if (res.locals.isList) next();
  else res.send(alert('게시글 리스트를 볼 수 있는 권한이 없습니다. 회원이시면 로그인 후 이용하세요.', '/'));
}

const isView = (req, res, next) => {
  if (res.locals.isView) next();
  else res.send(alert('게시글 내용을 볼 수 있는 권한이 없습니다. 회원이시면 로그인 후 이용하세요.', '/'));
}

const isWrite = (req, res, next) => {
  if (res.locals.isWrite) next();
  else if (req.query && req.query.type !== 'create' && req.query.type !== 'update') next();
  else res.send(alert('게시글을 작성할 권한이 없습니다. 회원이시면 로그인 후 이용하세요.', '/'));
}


module.exports = { isList, isView, isWrite };
