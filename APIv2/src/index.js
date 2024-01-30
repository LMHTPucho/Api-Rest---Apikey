import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from "./config/database.js";
import routes from './routes/routes.js';

import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Configurations
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

// Middleware
app.use(morgan('dev')); // Morgan for logging HTTP requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Routes for Google authentication linked from routes.js
app.use('/', routes); // Routing for authentication

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
