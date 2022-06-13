const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const likeRouter = require('./routes/like');
const orderRouter = require('./routes/order');
const categoryRouter = require('./routes/category');
const userProfileRouter = require('./routes/userprofile');
const roomRouter = require('./routes/room');
const mapRouter = require('./routes/map');
const reslistRouter = require('./routes/reslist');
const loginRouter = require('./routes/login');
const menuRouter = require('./routes/menu');
const indexRouter = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8080);
// app.set('view engine', 'html');
// nunjucks.configure('views', {
//   express: app,
//   watch: true,
// });
sequelize.sync({ force: false })
  .then(() => {
    console.log('db connected success');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/auth', authRouter);
//app.use('/image', imageRouter);
app.use('/like', likeRouter);
app.use('/order', orderRouter);
app.use('/category', categoryRouter);
app.use('/userprofile', userProfileRouter);
app.use('/room', roomRouter);
app.use('/map', mapRouter);
app.use('/reslist', reslistRouter);
app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} has no router.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port waiting');
});