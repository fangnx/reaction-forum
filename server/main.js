import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';

import routes from '../routes';
import config from '../config/config';
import path from 'path';

const app = new express();
const MongoStore = connectMongo(session);
const port = config.port;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        name: config.session.key,
        secret: config.session.secret,
        resave: true,
        saveUninitialized: false, // creates a session even not logged in
        cookie: {
            maxAge: config.session.maxAge // session expiry time
        },
        store: new MongoStore({
            url: config.mongodb // stores session into mongodb
        })
    })
);
app.use(flash());

routes(app);

app.listen(port, () => console.log(`App listening on port ${port} !`));
