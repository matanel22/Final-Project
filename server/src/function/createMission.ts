import { Request,Response } from "express";
import MissionModel, { validTasks } from "../model/modelMission";
import dayjs from "dayjs";



export const createMission=async(req:Request,res:Response)=>{
    
    
        try {
    //          let validata=validTasks(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
    
            let dataTask=await new MissionModel({
                discrption:req.body.discrption,
                statusId:"משימה חדשה",
                projectId:req.body.projectId,
                date_created:dayjs(req.body.date_created).format('MM-DD-YYYY').toString(),
                endDate: dayjs(req.body.endDate).format('MM-DD-YYYY').toString(),
                remarks:req.body.remarks,
                taskType:req.body.taskType
            
            });
            dataTask.save();
            res.json(dataTask);
        } catch (error) {
            res.json({err:"error",error})
        }
     }

