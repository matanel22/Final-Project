import { Request,Response } from "express";
import ModalProject, { validProject } from "../model/ModalProjct";
import MissionModel from "../model/modelMission";
import UsersModel from "../model/ModelUser";

export const allProject=async(req:Request,res:Response)=>{
//   let k=0
// let user = await UsersModel.find({})
// let projects=await ModalProject.find({});
// projects.map((item,index)=>{
//   if(user[k++].name===item.staff){
//   return  res.send(projects)
//   }
// })
    try {
        let projects=await ModalProject.find({});
        res.json(projects);
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

export const updateProject=async(req:Request,res:Response)=>{
  try {
    let updateData=await ModalProject.updateOne({_id:req.params.id},req.body);
    return res.send(updateData);
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









