module.exports = {
	host: '127.0.0.1',
	port: 5000,
	session: {
		secret: 'reaction-forum',
		key: 'reaction-forum',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/myblog',
	secretOrKey: 'secret'
};
