const fs = require('fs');
const path = require('path');
const { ask } = require('./interactor');
const destinationDir = process.argv[2];
let realPath = path.resolve(__dirname);
const packageJson = {
  name: realPath.split(path.sep).slice(-1)[0],
  author: getDefaultAuthor(),
  license: 'MIT',
};
initPackage().then(() => console.log('Done'));
async function initPackage() {
  packageJson.name = await ask(`What's your package name?(${packageJson.name}): `);
  packageJson.author = await ask(`What's your name?(${packageJson.author}): `);
  if (destinationDir) {
    realPath = path.join(realPath, destinationDir);
    fs.mkdirSync(realPath);
  }
  fs.writeFileSync(
    path.join(realPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
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
