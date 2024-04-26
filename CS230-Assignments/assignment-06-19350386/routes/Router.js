const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller');

router.post('/customer', controller.insertCustomer);
router.get('/customer/:_id?',controller.findCustomer);
router.put('/customer/:_id?',controller.updateCustomer);
router.delete('/customer/:_id?',controller.deleteCustomer);

router.post('/phone',controller.insertPhone);
router.get('/phone/:_id?',controller.findPhone);
router.put('/phone/:_id?',controller.updatePhone);
router.delete('/phone/:_id?',controller.deletePhone);

router.post('/order',controller.insertOrder);
router.get('/order/:id?',controller.findOrder);
router.put('/order/:_id?',controller.updateOrder);
router.delete('/order/:_id?',controller.deleteOrder);

router.get('/phone/:_id/customer',controller.findCustomerOrderedPhone);
module.exports = router;