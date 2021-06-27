const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const router = Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

router.post(
    "/schedule",
    [
        check("to", "Please enter a valid address").isEmail(),
        check("cc", "Please enter a valid cc").isString(),
        check("bcc", "Please enter a valid bcc").isString(),
        check("subject", "Please enter a valid subject(0-30)").not().isEmpty().isLength({
            max: 30
        }),
        check("body", "Please enter a valid body").not().isEmpty(),
        check("scheduledTo", "Please enter a valid Date").isDate(),
    ],
    auth,
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const mail = {to, cc, bcc, subject, body} = req.body;
        const {scheduledTo} = req.body;
        mail.cc = mail.cc.split(',')
        mail.bcc = mail.bcc.split(',')
        try {
            let user = await User.findById(req.user.id);
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            user.scheduledMails.push({
                mail,
                scheduledTo,
            })
            const result = await user.save()
            console.log('/schedule success',result);
            res.status(200).json({
                message: "Your mail is sent",
                id:result.scheduledMails[result.scheduledMails.length - 1].mail.id
            })
        } catch (e) {
            console.log('/schedule fail',e);
            res.send({ message: "Error in sending" })
        }
    })

router.get(
    "/scheduled",
    auth,
    async (req,res)=>{
        try {
            let user = await User.findById(req.user.id);
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            console.log('/scheduled success',result);
            res.status(200).json({
                allMails: user.scheduledMails,
            })
        } catch (e) {
            console.log('/scheduled fail',e);
            res.send({ message: "Error in fetching" })
        }
    }
)

router.get(
    "/scheduled/:id",
    auth,
    async (req,res)=>{
        const id = req.params.id;
        try {
            let user = await User.findOne({
                "scheduledMails.mail.id": id,
            })
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            let findIndex = ()=>{
                for(let i=0;i<user.scheduledMails.length;i++){
                    if(user.scheduledMails[i].mail.id == id){
                        return i;
                    }
                }
                return undefined;
            }
            const index = findIndex()
            if (index === undefined)
            return res.status(400).json({
                message: "mail doesn't exist"
            })
            console.log('/scheduled/:id success');
            res.status(200).json({
                mail: user.scheduledMails[index],
            })            
        } catch (e) {
            console.log('/scheduled/:id fail',e);
            res.send({ message: `Error in fetching ${id}` })
        }
    }
)

module.exports = router
