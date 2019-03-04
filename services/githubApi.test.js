const githubApi = require('./githubApi');

describe('githubApi', () => {
  test('echo test', async () => {
    const data = await githubApi.test();
    expect(data).toMatch(/^.*\.$/);
  })
})
