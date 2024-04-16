// req.query.boardId -> 현재 게시판 정보
// 전체 게시판 정보
const _ = require('lodash');
const { BoardInit } = require('../models');

module.exports = (_field = 'query') => {
  return async (req, res, next) => {
    let { boardId } = req[_field];
    const { user } = res.locals;
    const boardLists = await BoardInit.findAll({
      order: [['id', 'asc']],
    });
    const [myBoard] = boardLists.filter((v, i) => {
      if (i === 0 && !boardId) boardId = v.id;
      return String(v.id) === String(boardId);
    });

    req[_field].boardId = boardId;
    req[_field].boardType = myBoard.boardType;
    res.locals.boardLists = _.sortBy(boardLists, 'title');
    res.locals.boardId = boardId;
    res.locals.boardType = myBoard.boardType;
    res.locals.boardTitle = myBoard.title;
    res.locals.useImg = myBoard.useImg;
    res.locals.useFile = myBoard.useFile;
    res.locals.useComment = myBoard.useComment;
    res.locals.useSecret = myBoard.useSecret;
    res.locals.levWrite = myBoard.levWrite;
    res.locals.levView = myBoard.levView;
    res.locals.levList = myBoard.levList;
    res.locals.isWrite = (user && myBoard.levList <= user.status) || myBoard.levWrite === '0';
    res.locals.isView = (user && myBoard.levView <= user.status) || myBoard.levView === '0';
    res.locals.isList = (user && myBoard.levList <= user.status) || myBoard.levList === '0';
    next();
  };
};
