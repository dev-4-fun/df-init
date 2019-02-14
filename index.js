const logger = require('./utils/logger');
const greeter = (name) => `Hello, ${name}!`;

logger.debug('Hello world', 7, { hello: 'world' }, null, ['a', 'b', 'c']);
module.exports = {
  greeter
};
