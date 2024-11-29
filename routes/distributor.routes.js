const Router = require('express');
const router = new Router();
const distributorController = require('../controller/distributor.controller.js');

router.post('/distributor', distributorController.createDistributor);
router.get('/distributor', distributorController.getDistributors);
router.get('/article-check', distributorController.checkArticle);
router.get('/distributor/:id', distributorController.getOneDistributor);
router.put('/distributor', distributorController.updateDistributor);
router.delete('/distributor/:id', distributorController.deleteOneDistributor);
router.delete('/distributor', distributorController.deleteDistributors);


module.exports = router;