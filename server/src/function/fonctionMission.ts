
import { Request,Response } from "express";

import ProjectModel from "../model/ModalProjct";
import MissionModel, { validTasks } from "../model/modelMission";
import StatusModal from "../model/ModalStatus";
import dayjs from "dayjs";


export const specificMission =async (req:Request,res:Response)=>{
    try {
        let task=await MissionModel.find({_id:req.body.id});
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
        return res.sendStatus(404).send(validTaskData.error)
      }
      let validProId=await ProjectModel.findOne({_id:req.body.projectId})
      if(validProId){
        let updateMissionData=await MissionModel.updateOne({_id:req.body.id},{
          _id:req.body.id,
          discrption:  req.body.discrption,
          statusId:req.body.statusId,
          projectId:req.body.projectId,
          date_created:dayjs(req.body.date_created).format('MM-DD-YYYY').toString(),
          endDate: dayjs(req.body.endDate).format('MM-DD-YYYY').toString(),
          remarks:req.body.remarks

        });
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
      // const sendTask={
      //   discrption:  task.discrption,
      //   statusId:req.body.statusId,
      //   projectId:req.body.projectId,
      //   date_created:dayjs(req.body.date_created).format('MM-DD-YYYY').toString(),
      //   endDate: dayjs(req.body.endDate).format('MM-DD-YYYY').toString(),
      //   remarks:req.body.remarks

      // }
      console.log("mlscmal",task);
      
      return res.send(task)
    } catch (error) {
     return console.log(error);
      
    }
  }


  export const deleteSpcificMission=async(req:Request,res:Response)=>{
    try {
      
  // console.log(req.params.id);
  
    
      let deleteMission=await MissionModel.findOne({_id:req.params.id});
      // console.log("fine",deleteMission,"req",req.params.id);

      return res.json(deleteMission);
    } catch (error) {
      return res.json(error);
    }
    
  }

  export const allStatusMission=async(req:Request,res:Response)=>{
    try {
     const statusTask=await StatusModal.find({})
     res.send(statusTask)
      } catch (error) {
  res.status(404).send("somting is wrong");
}
  }

  


