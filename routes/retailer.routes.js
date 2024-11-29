const Router = require('express');
const router = new Router();
const retailerController = require('../controller/retailer.controller.js');

router.post('/retailer', retailerController.createRetailer);
router.get('/retailer', retailerController.getRetailers);
router.get('/retailer/:id', retailerController.getOneRetailer);
router.delete('/retailer', retailerController.deleteRetailers);


module.exports = router;