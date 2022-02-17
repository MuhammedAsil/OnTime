const express = require("express");

const router = express.Router();

const Room =require('../models/room')

router.get("/getallrooms", async(req,res) =>{
    try {
        const rooms= await Room.find({})
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({message: error});
    }



}); 
router.post("/getallroomsbyid", async(req,res) =>{

    const roomid =req.body.roomid
    try {
        const room= await Room.findOne({_id: roomid})
        res.send(room);
    } catch (error) {
        return res.status(400).json({message: error});
    }



}); 


router.post("/addroom", async(req, res)=>{
    const newroom= new Room(req.body)
    try {
        const newroom= await newroom.save()
        return res.send('New Room added')
    } catch (error) {
        return res.status(400).json({error})
    }
})



module.exports= router; 