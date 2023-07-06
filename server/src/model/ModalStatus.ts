import mongoose from "mongoose";

const StatusSchema=new mongoose.Schema({
    _id:String,
    name:String
})
const StatusModal=mongoose.model('status',StatusSchema)
export default StatusModal;