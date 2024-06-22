const express = require('express');
const paypal = require('paypal-rest-sdk');
const Membership = require('../models/membershipModel'); // Adjust the path as needed
const User = require('../models/userModel'); // Adjust the path as needed

const router = express.Router();

// PayPal SDK configuration
paypal.configure({
    mode: 'sandbox', // Use 'sandbox' for testing
    client_id: 'AfJPmS4U8E_Vbnubt5avM0M3eZDV7_4L-9z9k8K_hS7LnrbiiSE0C-C8pLwE0NYK8CNoj8koqVKULMlm',
    client_secret: 'ECyZVjKgzcyqkauH8qNY9gwlzoJ_rg5E4TKdJ-YHokmrPQn2uipBTkRiLGNJPR12c6c2Tf2_Va7NqIo5'
});

// Route for initiating the PayPal payment
router.post('/pay', (req, res) => {
    const { name, price, currency, userId } = req.body;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: `http://192.168.2.137:8080/paypal/success?userId=${userId}`,
            cancel_url: `http://192.168.2.137:8080/paypal/cancel`
        },
        transactions: [{
            item_list: {
                items: [{
                    name: name,
                    sku: '001',
                    price: price,
                    currency: currency,
                    quantity: 1
                }]
            },
            amount: {
                currency: currency,
                total: price
            },
            description: `Purchase of ${name}`
        }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.json({ redirectUrl: payment.links[i].href, userId: userId });
                }
            }
            res.status(500).send('No redirect URL found');
        }
    });
});

// Route for handling PayPal payment approval
router.get('/success', async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const userId = req.query.userId;

    try {
        const payment = await new Promise((resolve, reject) => {
            paypal.payment.get(paymentId, (error, payment) => {
                if (error) {
                    return reject(error);
                }
                resolve(payment);
            });
        });

        const amount = payment.transactions[0].amount.total;
        const currency = payment.transactions[0].amount.currency;
        const plan = payment.transactions[0].item_list.items[0].name;

        let percentage;
        if (plan === 'Silver Plan') {
            percentage = 5;
        } else if (plan === 'Gold Plan') {
            percentage = 10;
        } else if (plan === 'Diamond Plan') {
            percentage = 15;
        }

        const execute_payment_json = {
            payer_id: payerId,
            transactions: [{
                amount: {
                    currency: currency,
                    total: amount
                }
            }]
        };

        const executedPayment = await new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
                if (error) {
                    return reject(error);
                }
                resolve(payment);
            });
        });

        const membership = new Membership({
            plan,
            percentage,
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            paymentInformation: {
                paymentMethod: 'PayPal',
                transactionId: executedPayment.id,
                amount: parseFloat(amount)
            },
            user: userId
        });

        const savedMembership = await membership.save();

        await User.findByIdAndUpdate(userId, { membership: savedMembership._id });

        res.send('Payment successful and membership saved!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

// Route for handling canceled PayPal payment
router.get('/cancel', (req, res) => {
    res.send('Payment canceled!');
});

module.exports = router;
