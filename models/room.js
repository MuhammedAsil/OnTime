const mongoose= require("mongoose");

const roomSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurls:[],
    currentbookings:[],
    description:{
        type: String,
        required:true
    },
    title:{
        type:String,
        required:true,
    }

} , {
    timestamp:true,
})

const roomModel = mongoose.model('rooms', roomSchema)
module.exports= roomModel