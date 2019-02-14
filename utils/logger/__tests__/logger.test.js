const mockProcess = require('jest-mock-process');

const mockStdOut = mockProcess.mockProcessStdout();
const logger = require('../index');

describe('logger: ', () => {
  test('should write "Hello world"', () => {
    const msg = 'Hello world';
    logger.log(msg);
    expect(mockStdOut).toHaveBeenCalledWith(msg);
  });
  test('should write level with message', () => {
    const msg = 'Hello world';
    Object
      .keys(logger)
      .filter(method => method !== 'log')
      .forEach(level => {
        logger[level](msg);
        expect(mockStdOut).toHaveBeenCalledWith([level, msg].join(' '));
      });
  });
  test('should write object shape', () => {
    const obj = {
      hello: 'world'
    };
    logger.log(obj);
    expect(mockStdOut).toHaveBeenCalledWith(JSON.stringify(obj));
  })
});
