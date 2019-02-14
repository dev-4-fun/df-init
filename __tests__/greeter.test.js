const { greeter } = require('../index');
const logger = require('../utils/logger');

logger.debug('Start');

test('Should add "Hello, " before argument', () => {
  const name = 'Dimitry';
  const result = 'Hello, Dimitry!';
  expect(greeter(name)).toBe(result);
});
