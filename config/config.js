module.exports = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 5000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};
