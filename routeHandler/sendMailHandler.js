const { Router } = require('express');
const router = Router();

router
    .route('/')
    .get((req,res)=>{
        res.json({message: 'this is send mail route'})
    })

module.exports = router
