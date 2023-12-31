const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment")


//=================================
//             Comment
//=================================


//커멘트 저장하기
router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err });

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });

                res.status(200).json({ succes: true, result });
            })

    })

    
})




module.exports = router;