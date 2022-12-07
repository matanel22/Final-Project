import { Request,Response } from "express";
import ProjectModel from "../model/ModalProjct";
import ModalProject, { validProject } from "../model/ModalProjct";
import MissionModel from "../model/modelMission";
import UsersModel from "../model/ModelUser";

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}
export const allProject=async(req:Request,res:Response)=>{
 

    try {
     let user=await UsersModel.findOne({_id:req.body.id})
     if(user?.permissions){
      let projects=await ModalProject.find({});
      return res.json(projects);
     }else{
      let projects=await ModalProject.find({userId:req.body.id});
      return res.json(projects);
     }
     
    } catch (error) {
        res.json(error);
    }
 
}

export const specificProject =async(req:Request,res:Response)=>{
  try {
    let project=await ModalProject.find({id:req.body.id})
    return res.json(project);
  } catch (error) {
    res.status(404).send(error)
  }


}
export const projSpecific=async(req:Request,res:Response)=>{
try {
  let project=await ProjectModel.findOne({_id:req.body.id})
 return res.send(project)
} catch (error) {
 return res.status(404).send(error)
}
}
export const updateProject=async(req:Request,res:Response)=>{
  let flag=false
  try {
    let updateData=await ProjectModel.updateOne({_id:req.body._id},req.body);
    let proj:any=await ProjectModel.findOne(req.body)
    
    let user=await UsersModel.find({})
    // console.log(user);
    user.map((item)=>{
      if(item.name===proj.staff){
        proj.userId=item._id;
        flag=true

      }
    })
    console.log(proj);
    if(flag){
      return res.send(updateData);
    }
    else {
      return res.send("dont found developer")
    }

  } catch (error) {
    return res.status(404).send(error);
  }
}


export const allMissionOfProject=async(req:Request,res:Response)=>{
try {
  let mission = await MissionModel.find({projectId:req.body.id},{__v:0});
return res.json(mission);
} catch (error) {
  return res.send(error);
}
}










