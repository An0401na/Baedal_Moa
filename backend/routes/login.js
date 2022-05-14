const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { users } = require('../models');
const kakaoAuth = require('./auth');

const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/', async (req, res, next) => {
    try{
        let userid = "";
        let username = "";
        if (req.body.access_token) {
        //초기 로그인
            const result = await kakaoAuth.getProfile(req.body.access_token);
            const kakaoUser = JSON.parse(result);
            userid = kakaoUser.id;
            username = kakaoUser.kakao_account.profile.nickname;
        } else {
        //자동 로그인
            const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {
                ignoreExpiration: true,
            });
            userid = user.id;
            username = user.name;
        }
        
        const [user, created] = await users.findOrCreate({
            where: { user_id: userid },
            defaults: {
                user_id: userid,
                user_nickname: username,
                user_token: req.body.access_token,
            },
            attributes: ['user_id', 'user_nickname'],
        });
    
        let responseData = {
            success: true,
            user,
        };

        if (req.body.access_token) {
            const token = jwt.sign({
                id: user.user_id,
                name: username,
            }, process.env.JWT_SECRET);
            responseData.jwt = token;
        }
    
        return res.status(created? 201: 200).json(responseData);
      } catch(err) {
        console.error(err);
        next(err);
    }
  });
  
module.exports = router;