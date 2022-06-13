const express = require('express');
const { users } = require('../models');

const router = express.Router();

//map 정보 전송
router.post('/', async(req, res, next) => {
    try{
        users.update({
            user_location_x: req.body.latitude,
            user_location_y: req.body.longitude
        }, {
            where: {
                user_id : req.body.user_id
            }
        })
        res.json({});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;