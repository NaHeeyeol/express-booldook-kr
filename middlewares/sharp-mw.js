const sharp = require('sharp');
const path = require('path');
const { ensureDir } = require('fs-extra');
const { relPath } = require('../modules/util');

module.exports = (width = 120) => {
  return async (req, res, next) => {
    try {
      for (let v of req.files) {
        if (v.mimetype.includes('image')) {
          let loc = path.join(v.destination, './thumb');
          await ensureDir(loc);
          v.thumb = await sharp(v.path)
            .resize(width)
            .jpeg({ mozjpeg: true })
            .toFile(path.join(loc, v.saveName));
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
