const fs = require('fs');
const path = require('path');

exports.cleanUpImage = function (filename) {
  fs.unlinkSync(`${path.resolve(__dirname, '..')}/public/img/${filename}`);
};
