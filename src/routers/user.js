const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/users' , (req,res)=>{
    console.log(req.body)
    const user = new User (req.body)
    user.save()
    .then((user)=>{res.status(200).send(user)})
    .catch((e)=>{res.status(400).send(e)})
})

/////////////////////////////////////
router.get ('/users' , (req , res) => {
    User.find({}).then ((users) =>{
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
  })
  router.get('/users/:id' , (req,res)=>{
    console.log(req.params)
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
    if(!user){
        res.status(404).send('Unable to find user')
    }
    return res.status(200).send(user)
    }).catch((e)=>{
       return res.status(500).send(e)
    })

  })
  /////////////////////////////////////
     router.patch('/users/:id' , async(req,res)=> {
      try {
         const _id = req.params.id 
         const user = await User.findByIdAndUpdate (_id , req.body , {
            new : true,
            runValidators : true
         })
         if(!user) {
            return res.status(404).send('Unable to find user')
         }
         res.status(200).send(user)
      }
      catch(e) {
         res.status(400).send(e)
      }
   })
   //////////////////////////////
   router.delete ('/users/:id' , async (req , res) => {
    try {
         const _id = req.params.id
         const user = await User.findByIdAndDelete(_id)
         if(!user) {
            return res.status(404).send('Unable to find user')
         }
         res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports = router
