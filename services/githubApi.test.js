const githubApi = require('./githubApi');

describe('githubApi', () => {
  test('echo test', async () => {
    githubApi.test = githubApi.test || function () { };
    const data = await githubApi.test();
    expect(data).toMatch(/^.*\.$/);
  });
  test('userInfo should return JSON', async () => {
    githubApi.userInfo = githubApi.userInfo || function () { };
    const data = await githubApi.userInfo('gribadze');
    expect(data).toHaveProperty('id');
  })
});
