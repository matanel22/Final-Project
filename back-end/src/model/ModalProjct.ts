import mongoose from "mongoose";
import Joi, { string }  from "joi";

const ProjectScama=new mongoose.Schema({
id:String,
nameProject:String,
client:String,
staff:String,
statusProject:String

})
const PojectModel=mongoose.model('projects',ProjectScama);
export default PojectModel


export const validProject=(_validData:any)=>{
    let joiSchema=Joi.object({
        nameProject:Joi.string().min(2).max(99).required(),
        staff:Joi.string().min(2).max(99).required(),
        client:Joi.string().min(3).max(50).required(),
        statusProject:Joi.string().min(3).max(50).required()
    })
    return joiSchema.validate(_validData)
}