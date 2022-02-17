const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://newuser:4402171@cluster0.nrwcz.mongodb.net/Thesis2'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo db connection has been failed')

})

connection.on('connected',()=>{
    console.log('Mongo db connected succesfully')
})

module.exports= mongoose; 



