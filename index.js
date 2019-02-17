const fs = require('fs');
const path = require('path');
const ask = require('./interactor').ask;
const destDirName = process.argv[2];
let realPath = path.resolve(__dirname);
if (destDirName) {
  realPath = path.join(realPath, destDirName);
  fs.mkdirSync(realPath);
}
const packageJson = {
  name: realPath.split(path.sep).slice(-1)[0],
  author: getDefautlAuthor(),
  license: 'MIT',
};
initPackage();
function initPackage() {
  ask(`What's name of your package?(${packageJson.name}): `)
    .then(() => ask(`What is your name?(${packageJson.author}): `))
    .then(() => {
      fs.writeFileSync(
        path.join(realPath, 'package.json'),
        JSON.stringify(packageJson, null, 2),
      );
    });
}

function getDefautlAuthor() {
  let author = 'Gribadze <fedor.dmitry@gmail.com>';

  return author;
}
