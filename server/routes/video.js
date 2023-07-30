const express = require('express');
const router = express.Router();
/*
const { User } = require("../models/Video");
const { auth } = require("../middleware/auth");
*/
//���� ���� ���̺귯��
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

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

//����� ����
router.post('/thumbnail', (req, res) => {

    //����� �����ϰ� ���� ����Ÿ�ӵ� ��������
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(filenames);

            filePath = "upload/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log("Sccrennshot taken");
            return res.json({ success: true, url: filePath, fileName: filenames });
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
})


module.exports = router;