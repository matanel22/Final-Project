import mongoose from "mongoose";
import Joi, { date }  from "joi";


const MissionScama=new mongoose.Schema({
    id:String,
    discrption:String,
    missionStatus:String,
    projectId:String,
    data_created:{
        type:Date
    },
    endDate:{type:Date},
    remarks:String
    })
    const MissionModel=mongoose.model('tesks',MissionScama)
    export default MissionModel
    
    
    export const validTasks=(_validData:any)=>{
        let joiSchema=Joi.object({
            discrption:Joi.string().min(2).max(99),
            missionStatus:Joi.string().min(3).max(50).required(),
            data_created:Joi.string().required(),
            projectId:Joi.string().required(),
            // endDate:Joi.date().r:equired
        })
        return joiSchema.validate(_validData)
    }