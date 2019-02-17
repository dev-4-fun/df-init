const fs = require('fs');
const path = require('path');
const ask = require('./interactor').ask;
const destDirName = process.argv[2];
let realPath = path.resolve(__dirname);
if (destDirName) {
  realPath = path.join(realPath, destDirName);
  fs.mkdirSync(realPath);
}
const defaultName = realPath.split(path.sep).slice(-1).join();
process.stdin.setEncoding('utf8');
ask(`What's name of your package?(${defaultName}): `, (data) => {
  const packageJson = {
    name: defaultName,
    author: 'Gribadze <fedor.dmitry@gmail.com>',
    license: 'MIT',
  };
  if (data.trim().length > 0) {
    packageJson.name = data.trim();
  }
  initPackage(packageJson);
});
function initPackage(packageJson) {
  fs.writeFileSync(
    path.join(realPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}
