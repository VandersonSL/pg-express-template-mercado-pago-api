const mercadopago = require('mercadopago')

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
  sandbox: process.env.NODE_ENV !== 'production'
})

module.exports = mercadopago
