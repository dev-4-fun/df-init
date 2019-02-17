const fs = require('fs');
const path = require('path');
const destDirName = process.argv[2];
let realPath = path.resolve(__dirname);
if (destDirName) {
  realPath = path.join(realPath, destDirName);
  fs.mkdirSync(realPath);
}
let packageName = realPath.split(path.sep).slice(-1).join();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  if (data.trim().length > 0) {
    packageName = data.trim();
  }
  process.stdin.pause();
  initPackage();
});
function initPackage() {
  if (fs.readdirSync(realPath).length === 0) {
    if (packageName === '\n') {
      packageName = realPath.split(path.sep).slice(-1).join();
    }
    const packageJson = {
      name: packageName,
      author: 'Gribadze <fedor.dmitry@gmail.com>',
      license: 'MIT',
    };
    fs.writeFileSync(
      path.join(realPath, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
  }
}
