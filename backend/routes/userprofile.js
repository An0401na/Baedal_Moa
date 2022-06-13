const express = require('express');
const { users } = require('../models');

const router = express.Router();

//user_id를 받으면 유저 정보 뽑아서 전송해줌
router.post('/', async(req, res, next) => {
    try {
        const userprofile = await users.findAll({
            attributes: ['user_id', 'user_nickname', 'user_location_x', 'user_location_y', 'user_cash'],
            where: {
                user_id : req.body.user_id
            }
        })
        
        res.json(userprofile);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        await users.update({
            user_nickname: req.body.nickname,
        }, {
            where: {
                user_id: req.body.user_id,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;