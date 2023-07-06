
import { Request,Response } from "express";

import ProjectModel from "../model/ModalProjct";
import MissionModel, { validTasks } from "../model/modelMission";
import StatusModal from "../model/ModalStatus";


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
      const validTaskData=validTasks(req.body)
      if(validTaskData.error){
      console.log(validTaskData.error);
        return res.send(validTaskData.error)
      }
      let validProId=await ProjectModel.findOne({_id:req.body.projectId})
      if(validProId){
        let updateMissionData=await MissionModel.updateOne({_id:req.body._id},req.body);
        return res.send(updateMissionData);
      }
      else return res.send("not found")
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

  export const allStatusMission=async(req:Request,res:Response)=>{
    try {
     const statusTask=await StatusModal.findOne({})
     console.log(statusTask);
     
     res.send(statusTask)
      } catch (error) {
  res.status(404).send("somting is wrong");
}
  }

  


