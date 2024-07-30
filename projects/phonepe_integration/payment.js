const crypto = require('crypto');
const axios = require('axios');
require("dotenv").config();

const newPayment = async (req, res) => {
    try {
        const merchantTransactionId = 'M' + Date.now();
        // const merchantTransactionId = '123456';
        req.body = { user_id: 'sanjay.samantra@ybl', price: 1, phone: 9861216682, name: 'sanjay' }
        const { user_id, price, phone, name } = req.body;
        const data = {
            merchantId: 'PGTESTPAYUAT93',
            merchantTransactionId: merchantTransactionId,
            merchantUserId: 'MUID' + user_id,
            name: name,
            amount: price * 100,
            redirectUrl: `http://localhost:5000/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: phone,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const key = '875126e4-5a13-4dae-ad60-5b8c8b629035';
        const string = payloadMain + '/pg/v1/pay' + key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        console.log(checksum, payloadMain)
        const options = {
            method: 'POST',
            url: URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };
        axios.request(options).then(function (response) {
            console.log('success', response.data)
            // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
            return res.json({ url: response.data.data.instrumentResponse.redirectInfo.url })
        })
            .catch(function (error) {
                console.error('Error');
            });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}
const checkStatus = async (req, res) => {
    console.log('Check status')
    const merchantTransactionId = req.params['txnId']
    const merchantId = 'PGTESTPAYUAT93'
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + '875126e4-5a13-4dae-ad60-5b8c8b629035';
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
    const options = {
        method: 'GET',
        // url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        url: `https://api-preprod.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };
    console.log(merchantTransactionId, req.params)
    // CHECK PAYMENT STATUS
    axios.request(options).then(async (response) => {
        if (response.data.success === true) {
            console.log(response.data)
            return res.status(200).send({ success: true, message: "Payment Success" });
        } else {
            return res.status(400).send({ success: false, message: "Payment Failure" });
        }
    })
        .catch((err) => {
            // console.error(err);
            res.status(500).send({ msg: err.message });
        });
};
module.exports = {
    newPayment,
    checkStatus
}