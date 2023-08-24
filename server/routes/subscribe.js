const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber")

//=================================
//             Subscribe
//=================================

//�����ڼ� ��ȸ�ϱ�
router.post('/subscribeNumber', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);

            return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
        });
    
})

//���� ���� ��ȸ�ϱ�
router.post('/subscribed', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);

            let result = false;
            if (subscribe.length > 0) {
                result = true;
            }

            return res.status(200).json({ success: true, subscribed: result });
        });

})

//���� ����ϱ�
router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, doc });
        });
})

//���� �ϱ�
router.post('/subscribe', (req, res) => {

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, doc });
        });
})



module.exports = router;