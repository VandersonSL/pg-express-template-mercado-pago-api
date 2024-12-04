// backend/routes/payment.js
const express = require('express');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const router = express.Router();

// Create client with access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'TEST-1988383444451687-120322-dce3939ea531338021d8f67c3d8c82e4-175533704'
});

// Create payment client
const payment = new Payment(client);

router.post('/create', async (req, res) => {
  try {
    // Validate access token
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      return res.status(500).json({ 
        error: 'Mercado Pago access token is not configured' 
      });
    }

    const { amount, description } = req.body;

    // Create payment
    const paymentResponse = await payment.create({
      body: {
        transaction_amount: Number(amount),
        description: description || 'Product Purchase',
        payment_method_id: 'pix',
        payer: {
          email: 'test@example.com'
        }
      }
    });

    res.json({
      id: paymentResponse.id,
      status: paymentResponse.status,
      detail: paymentResponse.status_detail,
      qr_code: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ 
      error: 'Payment processing failed', 
      details: error.message 
    });
  }
});

module.exports = router;