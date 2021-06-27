const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const router = Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

router.post(
    "/recurring",
    [
        check("to", "Please enter a valid address").isEmail(),
        check("cc", "Please enter a valid cc").isString(),
        check("bcc", "Please enter a valid bcc").isString(),
        check("subject", "Please enter a valid subject(0-30)").not().isEmpty().isLength({
            max: 30
        }),
        check("body", "Please enter a valid body").not().isEmpty(),
        check("recurringPeriod", "Please enter a valid period").not().isEmpty(),
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
        const {recurringPeriod} = req.body;
        mail.cc = mail.cc.split(',')
        mail.bcc = mail.bcc.split(',')
        try {
            let user = await User.findById(req.user.id);
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            user.recurringMails.push({
                mail,
                recurringPeriod,
            })
            const result = await user.save()
            console.log('/recurring success',result);
            res.status(200).json({
                message: "Your mail is sent",
                id:result.recurringMails[result.recurringMails.length - 1].mail.id
            })
        } catch (e) {
            console.log('/recurring fail',e);
            res.send({ message: "Error in sending" })
        }
    })

router.get(
    "/recurring",
    auth,
    async (req,res)=>{
        try {
            let user = await User.findById(req.user.id);
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            console.log('/recurring success',result);
            res.status(200).json({
                allMails: user.recurringMails,
            })
        } catch (e) {
            console.log('/recurring fail',e);
            res.send({ message: "Error in sending" })
        }
    }
)

router.get(
    "/recurring/:id",
    auth,
    async (req,res)=>{
        const id = req.params.id;
        try {
            let user = await User.findOne({
                "recurringMails.mail.id": id,
            })
            if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
            let findIndex = ()=>{
                for(let i=0;i<user.recurringMails.length;i++){
                    if(user.recurringMails[i].mail.id == id){
                        return i;
                    }
                }
                return undefined;
            }
            const index = findIndex()
            if (!index)
            return res.status(400).json({
                message: "mail doesn't exist"
            })
            console.log('/recurring/:id success',result);
            res.status(200).json({
                mail: user.recurringMails[index],
            })            
        } catch (e) {
            console.log('/recurring/:id fail',e);
            res.send({ message: "Error in sending" })
        }
    }
)

module.exports = router
