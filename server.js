const express = require ("express");
const app = express();
const dbConfig= require('./db')
const roomsRoute= require('./routes/roomsRoute')
const UserRoute=require('./routes/UserRoute')
const bookingsRoute=require('./routes/bookingsRoute')
app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', UserRoute)
app.use('/api/bookings', bookingsRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log ('Server has been started succesfully :)')); 

