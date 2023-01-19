import mongoose from "mongoose";
import Joi, { string }  from "joi";

const ProjectScama=new mongoose.Schema({
id:String,
userId:String,
nameProject:String,
client:String,
staff:String,
statusProject:String,
amountOfUsers:String

})
const ProjectModel=mongoose.model('projects',ProjectScama);
export default ProjectModel


export const validProject=(_validData:any)=>{
    let joiSchema=Joi.object({
        userId:Joi.string(),
        nameProject:Joi.string().min(2).max(99).required(),
        staff:Joi.string().min(2).max(99).required(),
        client:Joi.string().min(3).max(50).required(),
        statusProject:Joi.string().min(0).max(50).required(),
        amountOfUsers:Joi.string().min(0).max(50).required(),
    })
    return joiSchema.validate(_validData)
}