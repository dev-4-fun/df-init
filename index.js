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
  author: getDefaultAuthor(),
  license: 'MIT',
};
initPackage();
function initPackage() {
  ask(`What's your package name?(${packageJson.name}): `)
    .then(name => packageJson.name = name)
    .then(() => ask(`What's your name?(${packageJson.author}): `))
    .then(author => packageJson.author = author)
    .then(() => {
      fs.writeFileSync(
        path.join(realPath, 'package.json'),
        JSON.stringify(packageJson, null, 2),
      );
    });
}
function getDefaultAuthor() {
  const homeDir = process.env.HOME;
  const gitConfig = fs.readFileSync(path.join(homeDir, '.gitconfig'), { encoding: 'utf8' });
  const userData = /\[user]([\s\S]*?)\[/.exec(gitConfig)[1];
  if (userData) {
    const userName = /name.?=.?(.*)/g.exec(userData)[1];
    const userEmail = /email.?=.?(.*)/g.exec(userData)[1];
    return `${userName} <${userEmail}>`;
  }
  return '';
}
