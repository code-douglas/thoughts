import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import os from 'os';
import flash from 'express-flash';

const FileStore = sessionFileStore(session);

const sessionMiddleware = [
  session({
    name: 'session',
    secret: 'our_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    }
  }),

  flash(),

  (req, res, next) => {
    if (req.session.userid) {
      res.locals.session = req.session;
    }
    next();
  }
];

export default sessionMiddleware;
