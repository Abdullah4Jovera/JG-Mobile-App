const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PQ7NlGrOyzlgVTmSfu0VtojPj5rwLP5bZHRvXpc0KCGu2z0fVLg1Zbh6WQNOB0eD531l6W0iKCmljyKLfg8udQB00GcdYMRNJ'); // Replace with your Stripe secret key
const Membership = require('../models/membershipModel'); // Adjust the path as needed
const User = require('../models/userModel'); // Adjust the path as needed

router.post('/pay', async (req, res) => {
    const { userId } = req.body; // Modify the request payload as per your frontend needs

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents (multiply by 100 for $10)
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { userId }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});

router.post('/confirm', async (req, res) => {
    const { paymentIntentId, userId } = req.body; // Modify the request payload as per your frontend needs

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const membership = new Membership({
                plan: 'Silver Plan', // Modify as per your plan logic
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                paymentInformation: {
                    paymentMethod: 'Stripe',
                    transactionId: paymentIntent.id,
                    amount: paymentIntent.amount / 100 // Convert back to original currency unit
                },
                user: userId
            });

            const savedMembership = await membership.save();
            await User.findByIdAndUpdate(userId, { membership: savedMembership._id });

            res.send('Payment successful and membership saved!');
        } else {
            res.status(400).send('Payment not successful');
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ error: 'Payment confirmation failed' });
    }
});

module.exports = router;
