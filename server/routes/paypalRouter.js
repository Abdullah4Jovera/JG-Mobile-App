const express = require('express');
const paypal = require('paypal-rest-sdk');

const router = express.Router();

// Configure PayPal SDK with your API credentials
paypal.configure({
  mode: 'sandbox', // Use 'sandbox' for testing
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});

// Route for initiating the PayPal payment
router.get('/pay', (req, res) => {
  // Create payment details
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:8080//success', // Your success URL
      cancel_url: 'http://localhost:8080/cancel' // Your cancel URL
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Item Name',
          sku: '001',
          price: '10.00',
          currency: 'USD',
          quantity: 1
        }]
      },
      amount: {
        currency: 'USD',
        total: '10.00'
      },
      description: 'Description of the item'
    }]
  };

  // Create payment
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      // Redirect user to PayPal approval URL
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

// Route for handling PayPal payment approval
router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  // Execute payment
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{
      amount: {
        currency: 'USD',
        total: '10.00'
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      throw error;
    } else {
      console.log("Execute Payment Response");
      console.log(payment);
      // Payment successful, handle accordingly
      res.send('Payment successful!');
    }
  });
});

// Route for handling canceled PayPal payment
router.get('/cancel', (req, res) => {
  res.send('Payment canceled!');
});

module.exports = router;
