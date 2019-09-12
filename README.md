# Reaction Forum
Reaction Forum is a web forum with support for RSS subscriptions. It is built with the MERN (MongoDB, Express, React, Node.js) stack, and aimed to have features:

- Support for RSS subscriptions
  - Automatically adding posts from subscribed RSS sources in sub-forums
- Support for Markdown rendering in posts
- Mobile-friendly responsive UI design 

## Deployment
https://reaction-forum.herokuapp.com/

## Installation
```
npm install
```
It will install all the required `node_modules` and build the client.

---
If you are using `npm` of a very old version and the build is not triggered, you may need to manually run the script:
```
npm run postinstall
```

## Usage
```
npm start
```
## Built With
- React
- Redux (redux-thunk, redux-persist) - Managing application states
- [Semantic UI](https://react.semantic-ui.com/)
- [react-markdown](https://github.com/rexxars/react-markdown) - Rendering posts written in  Markdown format
---
- MongoDB, Mongoose - Database
- Express - Backend server
- Firebase - Storage for uploaded image files
- [Passport](http://www.passportjs.org/) - User registration and authentication
- [node-cron](https://github.com/kelektiv/node-cron) - Fetching from subscribed RSS sources on a set schedule

## License
This project is [MIT](https://github.com/fangnx/smoretify/blob/master/LICENSE) licensed.