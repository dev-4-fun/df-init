const https = require('https');
const baseUrl = 'https://api.github.com';
const headers = {
  'User-Agent': 'df-init',
  'Accept': 'application/vnd.github.v3_json'
};
const githubApiConfig = {
  test: { path: '/zen' },
  // userInfo: userName => ({
  //   path: `/users/${userName}`
  // })
}
const githubApi = Object.keys(githubApiConfig)
  .reduce((api, callConfigName) => {
    const { method = 'get', path = '' } = githubApiConfig[callConfigName];
    return { ...api, [callConfigName]: () => apiCall(method, path) };
  }, {});
if (require.main === module) {
  githubApi.test().then(console.log);
}
function apiCall(method, path) {
  return new Promise((resolve, reject) =>
    https[method](baseUrl + path, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      })
    }).on('error', (error) => {
      reject(`Error <githubApi>: ${error.message}`)
    }));
}
module.exports = githubApi;
