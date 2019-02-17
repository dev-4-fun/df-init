const readline = require('readline');
exports.ask = function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(question, (answer) => {
    callback(answer);
    rl.close();
  });
};
