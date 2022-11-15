import express,{ Request,Response } from 'express';
import  UsersModel,{validMustUser, validUser,genToken} from '../model/ModelUser';
import bcrypt from "bcrypt";




export const validatIsUsers=async(req:Request,res:Response)=>{
    let validata=validUser(req.body);
    if(validata.error){
     return res.status(404).json(validata.error.details)
    }
    else{
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
  
    
 }


 export const login = async(req:Request,res:Response)=>{
       
   //  let validata=validMustUser(req.body);
   // if(validata.error){
   //   return res.status(404).json(validata.error.details)
   //  }

   let user: any=await  UsersModel.findOne({email:req.body.email})
   if(!user){
      res.status(404).json({msg:"user not found"})
    }
   
   let passValid=await bcrypt.compare(req.body.pass, user.pass);
   if(!passValid){
      return res.status(404).json({msg:"Incorrect pasword"})
   }
   
   let newToken=genToken(user._userId)
   res.json({token:newToken})
  }




  


 
