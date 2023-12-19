import express,{ Request,Response } from 'express';
import  UsersModel,{validMustUser, validUser,genToken} from '../model/ModelUser';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";


export const allUsers=async(req:Request,res:Response)=>{
  try {
    const users=await UsersModel.find({})
    console.log(users);
    
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
        
        
         let user:any=await new UsersModel({
          _id:new mongoose.Types.ObjectId(),
          name:req.body.name,
          password:await bcrypt.hash(req.body.password,10),
          email:req.body.email,
          permissions:false
         });
        //  user.password=await bcrypt.hash(user.pass,10);
        
        //  console.log(user);
         
          user.save();
          res.json(user);
         } catch (err) {
          console.log(err);
          res.status(400).json({err:"email llegal"})
         }
        }
    // }
  
    



 export const login = async(req:Request,res:Response)=>{
       
   //  let validata=validMustUser(req.body);
   // if(validata.error){
   //   return res.status(404).json(validata.error.details)
   //  }
   try {
    

   let user: any=await UsersModel.findOne({email:req.body.email})
   console.log(user);
   
   if(!user){
    return  res.status(404).json({msg:"user not found"})
    }
   
   
   
   let passValid=await bcrypt.compare(req.body.password, user.password);
   console.log(passValid);
   
   if(!passValid){
      return res.status(404).json({msg:"Incorrect password"})
   }
   
   let newToken=genToken(user._id)
  return res.json({token:newToken})
   } catch (error) {
    console.log(error);
    res.status(400).send(error)
    
   }

  }

 export const userInfo= async(req:Request,res:Response)=>{
  
try {
  let token:any=req.header("x-api-key");
   
  if(!token){
return  res.status(404).json("your most connect")
}
   let docoToken=jwt.verify(token,"matanel");
  
   let user = await UsersModel.find({_id:docoToken})
  
  
    return res.json(user)
  } catch (error) {
   console.log(error);
   
  }

  }

  export const userLogout=async(req:Request,res:Response)=>{
try {
  // const deleteUser=await UsersModel.deleteOne({_id:req.body.id})

// res.send(deleteUser)
} catch (error) {
  console.log(error);
 return res.status(404).send("somting is wrong")
}
  }

export const updatePermissionUser=async (req:Request,res:Response)=>{
try {
  
  
  const nameUserUpdate=await UsersModel.updateOne({_id:req.body.updateUserById},
    { $set: { permissions:req.body.namePermission.trim()==="מנהל"?true:false  }});
res.send(nameUserUpdate)
} catch (error) {
  console.log(error);
  res.status(400).send("sumting is worng")
}

}

  


 
