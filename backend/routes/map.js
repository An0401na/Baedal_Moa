const express = require('express');
const { } = require('../models');
const { users } = require('../models');

const router = express.Router();

router.post('/', async(req, res, next) => {
    try{
        console.log(req.body);
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