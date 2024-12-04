const validatePayment = (req, res, next) => {
  const { transaction_amount, description, payment_method_id, payer } = req.body

  if (!transaction_amount || !description || !payment_method_id || !payer) {
    return res.status(400).json({ error: 'Missing required payment information' })
  }

  next()
}

module.exports = validatePayment
