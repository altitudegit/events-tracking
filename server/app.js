import express from 'express';
import session from 'express-session';

import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import env from './config/env';
import routes from './routes';

import passport from 'passport';
import passportService from './passport';

const app = express();

/*==================================
=            Middleware            =
==================================*/
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// serve static files, this is for frontend React
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/

/*===========================================
=            Baic Authentication            =
===========================================*/
app.use(session({
  secret: 'mySecret',
  cookie: { httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());
passportService.initializePassport(passport);
/*=====  End of Baic Authentication  ======*/

/*===========================
=            COR            =
===========================*/

// app.use(require('cors')());

/*=====  End of COR  ======*/

// Routes
app.use('/api/v1', routes.userRoute);
app.use('/api/v1', routes.eventRoute);

// Load React App
// Serve HTML file for production
if (env.name === 'production') {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

export default app;
