const express = require("express")

const router = express.Router();
const Booking = require ("../models/booking")
const moment= require("moment")
const Room=require("../models/room")

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
    }= req.body
    try {
        const newbooking= new Booking({
            room: room.name,
            roomid:room._id,
            userid:userid,
            fromdate: moment(fromdate).format('YYYY-MM-DD HH:mm'),
            todate:moment(todate).format('YYYY-MM-DD HH:mm'),
            transactionId: '1234'
        })

        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({_id: room._id})
        roomtemp.currentbookings.push({
            bookingid:booking.id, 
            fromdate: moment(fromdate).format('YYYY-MM-DD HH:mm'),
            todate: moment(todate).format('YYYY-MM-DD HH:mm'), 
            userid: userid, status: booking.status})
        await roomtemp.save()
        return res.send('Room booked succesfully')

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error});
    }
});

router.post("/getbookingsbyuserid", async(req,res) =>{
    const userid = req.body.userid

    try {
        const bookings = await Booking. find({userid : userid})
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json({error});
        
    }
})

router.post("/cancelbooking", async(req,res)=>{
    const {bookingid, roomid}= req.body

    try {
        const bookingitem = await Booking.findOne({_id: bookingid})
        bookingitem.status= 'cancelled'
        await bookingitem.save()
        const room = await Room.findOne({_id: roomid})
        const bookings = room.currentbookings
        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)

        room.currentbookings= temp
        await room.save()

        return res.send('Your booking cancelled')

        
    } catch (error) {
        return res.status(400).json({error})
        
    }

})

router.get("/getallbookings" , async(req,res)=>{
    try {
        const bookings  = await Booking.find()
        return res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }
})
module.exports= router