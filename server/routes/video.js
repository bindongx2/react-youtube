const express = require('express');
const router = express.Router();
/*
const { User } = require("../models/Video");
const { auth } = require("../middleware/auth");
*/
//���� ���� ���̺귯��
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {//uploads������ ����
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {//�����̸� ����
        //��ƽ(`) ���ο��� ${}���� ������ ǥ������ ���θ� �ش� ���� ���ڿ��� ����
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {//���� ����(Ȯ����)
        /*if (file.mimetype == 'video/mp4') {
            cb(null, true);
        } else {
            cb(res.status(400).end('mp4���ϸ� �����մϴ�.'), false);
        }*/
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4') {
            return cb(res.status(400).end('mp4���ϸ� �����մϴ�.'), false);
        }
        cb(null, true);
    }
})

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //������ ������ �����Ѵ�.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
})

module.exports = router;