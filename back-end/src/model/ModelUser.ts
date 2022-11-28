import mongoose from "mongoose";
import Joi, { string }  from "joi";
import jwt from 'jsonwebtoken'
// import authToken from "../auto/autoToken";


const UserSchema=new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    permissions:String,
    name:String,
    email:String,
    pass:String,
role:{
    type:String,default:'regular'
},
data_created:{
    type:Date,default:Date.now()
}
})
const UsersModel=mongoose.model('users',UserSchema)
export default UsersModel

export const validUser=(_validData:any)=>{
    let joiSchema=Joi.object({
        // _id:string().required(),
        permissions:Joi.string(),
        name:Joi.string().min(2).max(99).required(),
        email:Joi.string().min(2).max(99).required().email(),
        pass:Joi.string().min(3).max(50).required(),
    })
    return joiSchema.validate(_validData)
}
export const genToken =(_userId:Object)=>{
const token=jwt.sign({_id:_userId},"matanel",{expiresIn:"60mins"});
return token;
}
export const validMustUser=(_validData:any)=>{
    let joiSchema=Joi.object({
    email:Joi.string().min(2).max(99).required().email(),
    pass:Joi.string().min(3).max(50).required()
})
return joiSchema.validate(_validData)

}




