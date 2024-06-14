require('dotenv').config();
console.log(process.env.NODE_ENV === 'production');

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const helmet = require('helmet');

// Connect to MongoDB
const db_url = process.env.DB_URL || 'mongodb://localhost:27017/unhappyFish';

mongoose.connect(db_url)
    .then(() => {
        console.log('Connected to MongoDB - unhappyFish');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Mongo Schema
const { UserModel } = require('./assets/models/mongoSchema');

// Config
const app = express();
app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

/*
// Setup session store
const MongoStore = require('connect-mongo');
const store = MongoStore.create({
    mongoUrl: db_url,
    secret: process.env.SECRET || 'your_secret_key',
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.error("SESSION STORE ERROR:", e);
});

const sessionConfig = {
    store: store,
    name: 'session',
    secret: process.env.SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
*/
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: db_url,
    collection: 'sessions'
});

store.on('error', function (error) {
    console.log(error);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: true
}));

// Passport plug-in
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// Flash
app.use(flash());

// helmet
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://api.mapbox.com/",
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/doy9gjdfi/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// Local variables
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.isLogin = true;
        res.locals.userID = req.user._id;
    } else {
        res.locals.userID = null;
        res.locals.isLogin = false;
    }

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
const homeRoutes = require('./assets/routes/homeRoutes');
const userRoutes = require('./assets/routes/userRoutes');
const locationRoutes = require('./assets/routes/locationRoutes');
const reviewRoutes = require('./assets/routes/reviewRoutes');

app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/locations', locationRoutes);
app.use('/locations/:id/reviews', reviewRoutes);

// Page not Found
app.all('*', (req, res) => {
    res.render('errors/404Page');
});

// Error Page
app.use((err, req, res, next) => {
    console.error(err);
    res.render('errors/500Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
