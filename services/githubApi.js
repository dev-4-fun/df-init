const { isFunction } = require('../helpers/isFunction');
const request = require('../helpers/isFunction');

const baseUrl = 'https://api.github.com';
const headers = {
  'User-Agent': 'df-init',
  'Accept': 'application/vnd.github.v3_json'
};

let githubApi = {
  test: { path: '/zen' },
  userInfo: {
    path: userName => `/users/${userName}`
  }
}

githubApi = Object.keys(githubApi)
  .reduce((api, callConfigName) => {
    const { method = 'get', path } = githubApi[callConfigName];
    return {
      ...api,
      [callConfigName]: (paramsOrCallback, callback) => {
        let cb = callback;
        let params = paramsOrCallback;
        if (isFunction(paramsOrCallback)) {
          params = null;
          cb = paramsOrCallback;
        }
        return apiCall(method, isFunction(path) ? path(params) : path, cb);
      }
    };
  }, {});

function apiCall(method, url, callback) {
  if (typeof callback === 'undefined') {
    return new Promise((resolve, reject) =>
      request({ method, url: baseUrl + url, headers }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data)
      }));
  }
  return request({ method, url: baseUrl + url, headers }, callback);
}

module.exports = githubApi;
