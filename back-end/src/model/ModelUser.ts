import mongoose from "mongoose";
import Joi  from "joi";
import jwt from 'jsonwebtoken'


const UserSchema=new mongoose.Schema({
    name:String ,
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
        name:Joi.string().min(2).max(99).required(),
        email:Joi.string().min(2).max(99).required().email(),
        pass:Joi.string().min(3).max(50).required(),
    })
    return joiSchema.validate(_validData)
}
export const genToken =(_userId:string)=>{
const token=jwt.sign({id:_userId},"matanel",{expiresIn:"60mins"});
return token;
}
export const validMustUser=(_validData:any)=>{
    let joiSchema=Joi.object({
    email:Joi.string().min(2).max(99).required().email(),
    pass:Joi.string().min(3).max(50).required()
})
return joiSchema.validate(_validData)

}


