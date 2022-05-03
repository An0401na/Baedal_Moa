const passport = require('passport');
const kakao = require('./kakaoStrategy');
const { users } = require('../models/');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user_id, done) => {
    users.findOne({
      where: { user_id },
      include: [{
        model: users,
        attributes: ['id'],
      }, {
        model: users,
        attributes: ['id'],
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  kakao();
};
