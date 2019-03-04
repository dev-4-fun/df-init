const https = require('https');
const { isFunction } = require('../helpers/isFunction');

const baseUrl = 'https://api.github.com';
const headers = {
  'User-Agent': 'df-init',
  'Accept': 'application/vnd.github.v3_json'
};

const githubApiConfig = {
  test: { path: '/zen' },
  userInfo: {
    path: userName => `/users/${userName}`
  }
}

const githubApi = Object.keys(githubApiConfig)
  .reduce((api, callConfigName) => {
    const { method = 'get', path } = githubApiConfig[callConfigName];
    return {
      ...api,
      [callConfigName]: (...args) => apiCall(method, isFunction(path) ? path(...args) : path)
    };
  }, {});

function apiCall(method, path) {
  return new Promise((resolve, reject) =>
    https[method](baseUrl + (path ? path : ''), { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve(data);
        }
      })
    }).on('error', (error) => {
      reject(`Error <githubApi>: ${error.message}`)
    }));
}

module.exports = githubApi;
