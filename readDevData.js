const fs = require('fs');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

module.exports = readFilePro;
