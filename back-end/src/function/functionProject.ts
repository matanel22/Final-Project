import { Request,Response } from "express";
import ModalProject, { validProject } from "../model/ModalProjct";
import MissionModel from "../model/modelMission";

export const allProject=async(req:Request,res:Response)=>{

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

export const deleteSpcificProject=async(req:Request,res:Response)=>{
  try {
    let deleteProject=await ModalProject.deleteOne({_id:req.params.id});
    return res.json(deleteProject);
  } catch (error) {
    return res.json(error);
  }
  
}
export const updateProject=async(req:Request,res:Response)=>{
  try {
    let updateData=await ModalProject.updateOne({_id:req.body.id},req.body.name);
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









