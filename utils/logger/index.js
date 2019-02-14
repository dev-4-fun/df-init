const logger = {
  log(...args) {
    process.stdout.write(`${
      args
        .map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg)
        .join(' ')
    }`);
  },
  debug(/*...args*/){},
  info(/*...args*/){},
  warn(/*...args*/){},
  err(/*...args*/){}
}; 

Object.keys(logger)
  .filter(method => method !== 'log')
  .forEach(level => {
  logger[level] = function(...args) {
    this.log(level, ...args);
  }
});

module.exports = logger;
