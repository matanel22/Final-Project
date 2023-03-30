import mongoose from "mongoose";
import Joi, { date }  from "joi";


const MissionScama=new mongoose.Schema({
    id:String,
    discrption:String,
    missionStatus:String,
    projectId:String,
    date_created:{
        type:Date
    },
    endDate:{type:Date},
    remarks:String
    })
    const MissionModel=mongoose.model('tesks',MissionScama)
    export default MissionModel
    
    
    export const validTasks=(_validData:any)=>{
        let joiSchema=Joi.object({
            _id:Joi.string().required(),
            discrption:Joi.string().min(2).max(99),
            missionStatus:Joi.string().min(3).max(50).required(),
            date_created:Joi.date().required(),
            projectId:Joi.string().required(),
            endDate:Joi.date().required(),
            remarks:Joi.string()
        })
        return joiSchema.validate(_validData)
    }