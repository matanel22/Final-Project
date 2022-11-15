import { Request,Response } from "express";
import ModalProject, { validProject } from "../model/ModalProjct";

export const addCreatProject = async (req:Request,res:Response)=>{
    let validata=validProject(req.body);
    if(validata.error){
      return res.status(404).json(validata.error.details)
     }
     else{
        try {
            let project=await new ModalProject(req.body);
            if(!project){
                return res.json({msg:"please try again"})
            }
            project.save();
            res.json(project)
        } catch (error) {
            return res.json({msg:error})
        }
     }
   
}