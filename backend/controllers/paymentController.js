const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
});


const createOrder = async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body;

    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).send('Some error occured');
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ status: 'failure', message: 'Invalid signature' });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};
