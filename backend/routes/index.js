const express = require('express');
//const { isLoggedIn } = require('./middlewares');
const { rooms } = require('../models');

const router = express.Router();

//test
router.get('/', async (req, res, next) => {
    try{
        const room = await rooms.findAll({
            where: {
                room_is_active:true
            }
        });
        res.json(room);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//test
router.post('/', async(req, res, next) => {
    try{
        console.log(req.body);
        res.json({});
        const result = {
            id: 5,
            name: 'hi'
        }
        res.send(result);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;