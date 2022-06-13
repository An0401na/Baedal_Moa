const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const { users } = require('../models');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await users.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          user_nickname: "kakaoLogin",
          user_token: profile.id,
          user_location_x: 50,
          user_location_y: 50,
          user_cash:50
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
