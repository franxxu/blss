const fs = require('fs');
const path = require('path');

exports.cleanUpImage = function (filename) {
  const file = `${path.resolve(__dirname, '..')}/public/img/${filename}`;
  if (fs.existsSync(file)) fs.unlinkSync(file);
};
