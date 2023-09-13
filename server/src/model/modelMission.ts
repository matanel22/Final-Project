import mongoose from "mongoose";
import Joi  from "joi";


const MissionScama=new mongoose.Schema({
    id:String,
    discrption:String,
    statusId:String,
    projectId:String,
    date_created:{
        type:Date
    },
    endDate:{type:Date},
    remarks:String,
    missionAccoplished:Boolean,
    taskType:String
    })
    const MissionModel=mongoose.model('tesks',MissionScama)
    export default MissionModel
    
    
    export const validTasks=(_validData:any)=>{
        let joiSchema=Joi.object({
            _id:Joi.string().required(),
            discrption:Joi.string().min(2).max(99),
            statusId:Joi.string(),
            date_created:Joi.date().required(),
            projectId:Joi.string().required(),
            endDate:Joi.date().required(),
            remarks:Joi.string()
        })
        return joiSchema.validate(_validData)
    }