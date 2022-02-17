const express = require("express");
const router= express.Router();
const User = require("../models/user")

router.post("/register", async(req,res)=>{
    const UserData = ({email: req.body.Email, name: req.body.Name, password: req.body.Password});
    console.log(UserData)
    const newuser = new User(UserData)
    try {
    
        const user = await newuser.save()
        res.send('User registration has been succesfully completed.')  
    } catch (error) {
        return res.status(400).json({error});
        
    }
});
router.post("/login", async (req,res)=>{
    const {Email,Password}= req.body
    console.log(Email,Password)
    try {
        const user = await User.findOne({email : Email, password: Password})
        if (user){
            const currentUser={
                name : user.name, 
                email:user.email,
                isAdmin: user.isAdmin,
                _id:user._id,
            }
            return res.send({currentUser})
            
        }else{
         return res.status(400).json({message : 'Login failed'})}
    } catch (error) {
        return res.status(400).json({error})  
    }
})
router.get("/getallusers", async (req, res)=>{
    try {
        const users= await User.find()
        return res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})
module.exports=router