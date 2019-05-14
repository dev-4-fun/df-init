const http = require('http');
const https = require('https');

function request({
  method = 'get',
  headers,
  url,
}, callback) {
  const protocol = /^(https:)?\/\//.test(url) ? https : http;
  return protocol[method](
    url,
    { headers },
    (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          callback(null, JSON.parse(data));
        } catch (error) {
          callback(null, data);
        }
      })
    }
  ).on('error', (error) => {
    callback(error, null);
  });
}

function buildRequest(requestOptions) {
  const protocol = requestOptions && requestOptions.protocol === 'https' ? https : http;
  const { headers } = requestOptions;
  return {
    get: ({ headers: additionalHeaders, url }, callback) => {
      const req = protocol.request({
        ...requestOptions,
        headers: {
          ...headers,
          ...additionalHeaders 
        }),
      })
    }
  }
}

module.exports = request;
