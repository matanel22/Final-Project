import mongoose, { Schema } from "mongoose";
import Joi from "joi";
import { IUsers } from "./ModelUser";


const ProjectScama=new mongoose.Schema({
id:String,
staff:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
nameProject:String,
client:String,
// staff:String,
createdAt: {
    type: Date,
    default: Date.now,
  },
  projectNumber: {
    type: String,
    unique: true,
    required: true,
  },
statusProject:String,
amountOfUsers:String

})
const ProjectModel=mongoose.model('projects',ProjectScama);
export default ProjectModel


export const validProject=(_validData:any)=>{
    let joiSchema=Joi.object({
        // userId:Joi.string(),
        nameProject:Joi.string().min(2).max(99).required(),
        staff:Joi.string().min(2).max(99).required(),
        client:Joi.string().min(3).max(50).required(),
        statusProject:Joi.string().min(0).max(50).required(),
        amountOfUsers:Joi.string().min(0).max(50).required(),
    })
    return joiSchema.validate(_validData)
}