const readline = require('readline');
exports.ask = function ask(question, defaultAnswer) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      if (answer !== '') {
        resolve(answer);
      } else {
        resolve(defaultAnswer);
      }
    });
  });
};
