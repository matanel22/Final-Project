
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
      // const validTaskData=validTasks(req.body)
      // if(validTaskData.error){
      // console.log(validTaskData.error);
      //   return res.sendStatus(404).send(validTaskData.error)
      // }
      // let validProId=await MissionModel.findOne({_id:req.body.projectId})
      // if(validProId){
        let updateMissionData=await MissionModel.updateOne({_id:req.body.id},{
          // _id:req.body.id,
          discrption:  req.body.discrption,
          statusId:req.body.statusId,
          projectId:req.body.projectId,
          date_created:dayjs(req.body.date_created).format('MM-DD-YYYY').toString(),
          endDate: dayjs(req.body.endDate).format('MM-DD-YYYY').toString(),
          remarks:req.body.remarks,
          

        });
        return res.send(updateMissionData);
      // }
      // else return res.send("not found")
    } catch (error) {
      return res.status(404).send(error);
    }

  }
  export const taskOne=async(req:Request,res:Response)=>{
    try {
      let task=await MissionModel.findOne({_id:req.body._id})
      if(task){
      const sendTask={
        id:task._id,
        discrption:  task.discrption,
        statusId:task.statusId,
        projectId:task.projectId,
        date_created:dayjs(task.date_created).format("YYYY-MM-DD"),
        endDate:dayjs(task.endDate).format("YYYY-MM-DD"),
        remarks:task.remarks,
        taskType:req.body.taskType
      }
      // console.log(sendTask);
      
      return res.send(sendTask)
    }
     else{res.sendStatus(404)}
    } catch (error) {
     return console.log(error);
      
    }
  }
  export const taskByDate= async(req:Request,res:Response)=>{
    try {
      // Extract date from request body
      const { date } = req.body;
  
      const query = {
        projectId: req.body.projectId,
        date_created: { $lt: new Date(date) },
        endDate: { $gt: new Date(date) }
      };
      
      
      
      const tasks = await MissionModel.find(query);
      const formattedTasks = tasks.map(task => ({
        id:task._id,
        discrption:task.discrption,
        statusId:task.statusId,
        projectId:task.projectId,
        taskType:task.taskType,
        date_created: dayjs(task.date_created).format('MM-DD-YYYY').toString(),
        endDate: dayjs(task.endDate).format('MM-DD-YYYY').toString(),
        remarks:task.remarks,
      }));
  // date_created: dayjs(item.date_created).format('MM-DD-YYYY').toString(),
  //     endDate: dayjs(item.endDate).format('MM-DD-YYYY').toString(),
      // Send tasks as response
      res.json(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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
     const statusTask=await StatusModal.find({})
     res.send(statusTask)
      } catch (error) {
  res.status(404).send("somting is wrong");
}
  }

  export const accomplished=async(req:Request,res:Response)=>{

const allMission=await MissionModel.find({missionAccoplished:true});

console.log(allMission);
res.send(allMission)

  }

  


