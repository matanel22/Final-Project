import { Request,Response } from "express";
import MissionModel, { validTasks } from "../model/modelMission";


export const specificMission =async (req:Request,res:Response)=>{
    try {
        let task=await MissionModel.find({id:req.body.id});
        return res.json(task);
    } catch (error) {
        res.send(error)
    }
   
}
export const updateMission=async(req:Request,res:Response)=>{
    try {
      let updateData=await MissionModel.updateOne({_id:req.body._id},req.body);
      return res.send(updateData);
    } catch (error) {
      return res.status(404).send(error);
    }
   
  
  }
  export const taskOne=async(req:Request,res:Response)=>{
    try {
      let task=await MissionModel.findOne({_id:req.body._id})
      return res.send(task)
    } catch (error) {
     return console.log(error);
      
    }
  }


  export const deleteSpcificMission=async(req:Request,res:Response)=>{
    try {
      let deleteMission=await MissionModel.deleteOne({_id:req.params.id});
      return res.json(deleteMission);
    } catch (error) {
      return res.json(error);
    }
    
  }

  


