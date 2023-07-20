import { Request,Response } from "express";
import MissionModel, { validTasks } from "../model/modelMission";
import dayjs from "dayjs";


interface IProps {
    id: string,
    name:string,
    staff:string,
    statusId:boolean,
    client:string
}
export const createMission=async(req:Request,res:Response)=>{
    
        try {
    //          let validata=validTasks(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
    
            let dataTask=await new MissionModel({
                discrption:req.body.discrption,
                statusId:req.body.statusId,
                projectId:req.body.projectId,
                date_created:dayjs(req.body.date_created).format('MM-DD-YYYY').toString(),
                endDate: dayjs(req.body.endDate).format('MM-DD-YYYY').toString(),
                remarks:req.body.remarks
            
            });
            dataTask.save();
            res.json(dataTask);
        } catch (error) {
            res.json({err:"error",error})
        }
     }

