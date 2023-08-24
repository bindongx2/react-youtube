const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Auth } = require("../middleware/auth");
//���� ���� ���̺귯��
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { Subscriber } = require('../models/Subscriber');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {//uploads������ ����
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {//�����̸� ����
        //�����̸� ���ڵ� ��������(multer ���� --> 1.4.4�� ����)
        //��ƽ(`) ���ο��� ${}���� ������ ǥ������ ���θ� �ش� ���� ���ڿ��� ����
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

//���� ����
const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
    if (fileType == 'mp4') {
        cb(null, true);
    } else {
        //�ѱ� ����(to-be:ó��)
        cb({ msg: 'only mp4'}, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } //ũ������ : 10MB
}).single("file");

//=================================
//             Video
//=================================

//���� ���ε� ���� ����
router.post('/uploadfiles', (req, res) => {
    //������ ������ �����Ѵ�.
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, errorText: err.msg });
        }

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
})

//���� �����͸� DB���� �����ͼ� Ŭ���̾�Ʈ�� ������.
router.get('/getVideos', (req, res) => {

    //���� �����͸� DB���� �����ͼ� Ŭ���̾�Ʈ�� ������.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) { return res.status(400).send(err) };

            res.status(200).json({ success: true, videos });
        })
})

//���� �� �����͸� DB���� �����ͼ� Ŭ���̾�Ʈ�� ������.
router.post('/getVideoDetail', (req, res) => {

    //���� �� �����͸� DB���� �����ͼ� Ŭ���̾�Ʈ�� ������.
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, videoDetail) => {
            if (err) { return res.status(400).send(err) };

            return res.status(200).json({ success: true, videoDetail });
        })
    
        
})


//����� ����
router.post('/thumbnail', (req, res) => {

    //����� �����ϰ� ���� ����Ÿ�ӵ� ��������

    //���� ���� ��������
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });

    //����� ����
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log("Sccrennshot taken");
            return res.json({ success: true, url: filePath, fileDuration: fileDuration });
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshot({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename:'thumbnail-%b.png'
        })
})

//���� ���ε� �������� ����
router.post('/uploadVideo', (req, res) => {

    //���� �������� �����Ѵ�.
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        res.status(200).json({ success: true });
    })
})



//
router.post('/getSubscriptionVideos', (req, res) => {

    //�ڽ��� ���̵� ������ �����ϴ� ������� ã�´�.
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec((err, subscribersInfo) => {
            if (err) return res.status(400).send(err);

            let subscribedUser = [];
            subscribersInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
            })

            //ã�� ������� ������ �����´�.
            Video.find({ writer: { $in: subscribedUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);

                    res.status(200).json({ success: true, videos });
                });
        });

   

})




module.exports = router;