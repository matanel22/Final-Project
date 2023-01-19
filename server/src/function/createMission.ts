import { Request,Response } from "express";
import MissionModel, { validTasks } from "../model/modelMission";


interface IProps {
    id: string,
    name:string,
    staff:string,
    statusId:boolean,
    client:string
}
export const createMission=async(req:Request,res:Response)=>{
    
    // let validata=validTasks(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
     
        try {
            let dataTask=await new MissionModel(req.body);
            dataTask.save();
            res.json(dataTask);
        } catch (error) {
            res.json({err:"error",error})
        }
     }

