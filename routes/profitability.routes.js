const Router = require('express');
const router = new Router;
const profitabilityController = require('../controller/profitability.controller.js');

router.get('/profitability/:id', profitabilityController.getProfitability)


module.exports = router;