var config = {};
config.clientId = '{YOUR_CLIENT_ID}',
config.authorizeURL = [
  'https://www.instagram.com/oauth/authorize/',
  '?client_id=', config.clientId,
  '&redirect_uri=http://localhost:3000/authorized/&response_type=token&scope=public_content'
].join('');

module.exports = config;
