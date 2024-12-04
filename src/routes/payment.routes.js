const express = require('express')
const router = express.Router()
const validatePayment = require('../middlewares/validatePayment')
const PaymentController = require('../controllers/PaymentController')

router.post('/process', validatePayment, PaymentController.process)
router.get('/feedback', PaymentController.feedback)

module.exports = router
