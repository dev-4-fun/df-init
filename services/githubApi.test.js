const githubApi = require('./githubApi');

describe('githubApi', () => {
  test('echo test', async () => {
    githubApi.test = githubApi.test || function () { };
    const data = await githubApi.test();
    expect(data).toMatch(/^.*\.$/);
  });
});
