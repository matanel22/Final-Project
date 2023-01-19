import express,{ Request,Response } from 'express';
import  UsersModel,{validMustUser, validUser,genToken} from '../model/ModelUser';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


export const allUsers=async(req:Request,res:Response)=>{
  try {
    const users=await UsersModel.find({})
    return res.json(users)
  } catch (error) {
    return res.status(404).json(error);
  }
 

}
export const usersSpecific=async(req:Request,res:Response)=>{
  try {
    const user=await UsersModel.findOne({_id:req.body._id})
   return res.send(user)
  } catch (error) {
    return res.status(404).send(error)
  }

}


export const signUp=async(req:Request,res:Response)=>{
    // let validata=validUser(req.body);
    // if(validata.error){
    //  return res.status(404).json(validata.error.details)
    // }
    // else{
      try {
         let user: any=await new UsersModel(req.body);
         user.pass=await bcrypt.hash(user.pass,10);
          user.save();
          res.json(user);
         } catch (err) {
          console.log(err);
          res.status(400).json({err:"email Illegal"})
         }
    }
  
    



 export const login = async(req:Request,res:Response)=>{
       
   //  let validata=validMustUser(req.body);
   // if(validata.error){
   //   return res.status(404).json(validata.error.details)
   //  }

   let user: any=await UsersModel.findOne({email:req.body.email})
   if(!user){
    return  res.status(404).json({msg:"user not found"})
    }
   
   let passValid=await bcrypt.compare(req.body.pass, user.pass);
   if(!passValid){
      return res.status(404).json({msg:"Incorrect password"})
   }
   
   let newToken=genToken(user._id)
  return res.json({token:newToken})
  }

 export const userInfo= async(req:Request,res:Response)=>{
   let token:any=req.header("x-api-key");
   
   if(!token){
 return  res.status(404).json("your most connect")
}
try {

   let docoToken=jwt.verify(token,"matanel")
   console.log(docoToken);
   let user = await UsersModel.find({_id:docoToken})
  console.log(user);
  
    return res.json(user)
  } catch (error) {
   console.log(error);
   
  }

  }



  


 
