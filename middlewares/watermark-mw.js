const sharp = require('sharp');
const path = require('path');
const { ensureDir, remove, move } = require('fs-extra');
const { relPath, absPath } = require('../modules/util');

module.exports = (req, res, next) => {
  try {
    const mark = path.join(__dirname, '../public/img/watermark/autolink_watermark.png');
    const mark2 = path.join(__dirname, '../public/img/watermark/autolink_watermark_white.png');
    req.files.forEach(async (v, i) => {
      if (i > 0) {
        if (v.mimeType.includes('image')) {
          const composite = [
            { input: mark, gravity: 'north' },
            { input: mark, gravity: 'south' },
            { input: mark2 },
          ];
          const ext = path.extname(v.filename);
          const loc = path.join(v.destination);
          const tmpName = path.basename(v.filename, ext) + '_temp' + ext;
          await move(absPath(v.filename), absPath(tmpName));
          await ensureDir(loc);
          if (v.mimeType.includes('jpeg')) {
            await sharp(absPath(tmpName)).jpeg({ quality: 100 }).composite(composite).toFile(path.join(loc, v.filename));
            await remove(absPath(tmpName));
          }
          if (v.mimeType.includes('png')) {
            await sharp(absPath(tmpName)).png().composite(composite).toFile(path.join(loc, v.filename));
            await remove(absPath(tmpName));
          }
        }
      }
    });
    next();
  }
  catch (err) {
    next(err);
  }
};

