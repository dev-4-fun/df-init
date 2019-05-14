const githubApi = require('./githubApi');

describe('githubApi', () => {
  test('echo test', async () => {
    const data = await githubApi.test();
    expect(data).toMatch(/^.*\.$/);
  });
  test('userInfo should return JSON', async () => {
    const data = await githubApi.userInfo('gribadze');
    expect(data).toHaveProperty('id');
  })
});
