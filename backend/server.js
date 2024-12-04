const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

app.use(cors());
app.use(express.json());

app.post('/api/payment/create', async (req, res) => {
  try {
    const { 
      amount, 
      description, 
      paymentMethod, 
      installments 
    } = req.body;

    const paymentData = {
      transaction_amount: Number(amount),
      description: description,
      payment_method_id: paymentMethod,
      payer: {
        email: 'test@test.com'
      }
    };

    // Add installments for credit card
    if (paymentMethod === 'credit_card' && installments) {
      paymentData.installments = Number(installments);
    }

    const payment = await mercadopago.payment.create(paymentData);

    res.json({
      id: payment.body.id,
      status: payment.body.status,
      detail: payment.body,
      qr_code: payment.body.point_of_interaction?.transaction_data?.qr_code,
      payment_method: paymentMethod
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ 
      message: 'Erro ao criar pagamento', 
      error: error.message 
    });
  }
});

// Get payment methods
app.get('/api/payment-methods', async (req, res) => {
  try {
    const paymentMethods = await mercadopago.payment_methods.findAll();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar métodos de pagamento', 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});