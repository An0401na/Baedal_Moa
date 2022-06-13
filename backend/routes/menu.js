const express = require('express');
const { restaurant_menus } = require('../models');

const router = express.Router();

//메뉴정보 뽑아다가 전송
router.post('/', async (req, res, next) => {
    try {
        const res_menu = await restaurant_menus.findAll({
            attributes: ['menu_id', 'menu_name', 'menu_price', 'menu_image_dir'],
            where: {
                res_id: req.body.res_id
            }
        });
        res.json(res_menu);
    } catch(err) {
        console.error(err);
        next(err);
    }
 });
 
 module.exports = router;