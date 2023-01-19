import { Request,Response } from "express";
import ProjectModel from "../model/ModalProjct";
import ModalProject, { validProject } from "../model/ModalProjct";
import UsersModel from "../model/ModelUser";

export const addCreatProject = async (req:Request,res:Response)=>{
    let flag=false;
    let validata=validProject(req.body);
    if(validata.error){
      return res.status(404).json(validata.error.details)
     }
     else{
        try {
            let project=await new ProjectModel(req.body);

            if(!project){
                return res.json({msg:"please try again"})
            }
            let user=await UsersModel.find({});
             user.map((item,index)=>{
             if(item.name?.trim()===project.staff){
                 project.userId=item._id.toString();
                  flag=true
               }
           })
           if(flag){
            project.save();
            console.log(project.userId);
              return res.json(project)
           }
           else{
          return  res.status(404).json("dont found is developer")
           }
        } catch (error) {
            return res.json({msg:error})
        }
     }
   
}