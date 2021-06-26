const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const router = Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

router.post(
    "/send",
    [
        check("to", "Please enter a valid address").isEmail(),
        check("cc", "Please enter a valid cc").isString(),
        check("bcc", "Please enter a valid bcc").isString(),
        check("subject", "Please enter a valid subject(0-30)").not().isEmpty().isLength({
            max: 30
        }),
        check("body", "Please enter a valid body").not().isEmpty(),
    ],
    auth,
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const mail = req.body;
        mail.cc = mail.cc.split(',')
        mail.bcc = mail.bcc.split(',')
        try {
            let user = await User.findById(req.user.id);
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            user.sentMails.push({
                mail,
            })
            const result = await user.save()
            console.log('/send success',result);
            res.status(200).json({
                message: "Your mail is sent",
                id:result.sentMails[result.sentMails.length - 1].mail.id
            })
        } catch (e) {
            console.log('/send fail',e);
            res.send({ message: "Error in sending" })
        }
    })



module.exports = router
