import { Request,Response } from "express";
import ProjectModel from "../model/ModalProjct";
import ModalProject, { validProject } from "../model/ModalProjct";
import MissionModel from "../model/modelMission";
import UsersModel from "../model/ModelUser";
import dayjs from "dayjs";

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string[];
  client: string;
  // userId: string;
  statusProject: string;
  amountOfUsers: string;
}
export const allProject=async(req:Request,res:Response)=>{
 

    try {
      console.log(req.body);
      
     let user=await UsersModel.findOne({_id:req.body.id})
     if(user?.permissions){
     
      
      let projects=await ModalProject.find({});
      for(const project of projects){
        const users = await UsersModel.find({ _id: { $in: project.staff } });

        // Extracting names from the retrieved users
       users.map(user => user.name);
       
      }
// console.log(projects);

      return res.json(projects);
     }else{
      
      let projects=await ModalProject.find({staff:req.body.id});
      for(const project of projects){
        const users = await UsersModel.find({ _id: { $in: project.staff } });

        
        const userNames = users.map(user => user.name);
        // project.staff = userNames;


        
       }
      // console.log(projects);
      
      
      return res.json(projects);
     }
     
    } catch (error) {
        res.json(error);
    }
 
}
// function searchByName(array:[], name:string) {
//   return array.find(item => item.name === name);
// }
export const organizationFind=async(req:Request,res:Response)=>{
  try {
  
    let nameSearch= req.body.findingSearch;
    console.log(nameSearch);
    
    let projects=await ModalProject.find({});
  let find= projects.filter(item => item.nameProject === nameSearch);
  console.log(find);
  
if(find){
  res.send(find)
}
else{res.send({mes:"dont find project"})}
   
   
  } catch (error) {
    res.status(404).send(error)
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

  let proj:any=await ProjectModel.findOne({_id:req.body._id})
  try {
    let user=await UsersModel.find({})
    // console.log(user);
    user.map(async(item)=>{
      if(item.name===proj.staff){
        proj.userId=item._id;
        let updateData=await ProjectModel.updateOne({_id:req.body._id},req.body);
        return res.send(updateData)
      }
    })
    // console.log(proj);
// res.send(proj)
  } catch (error) {
    console.log(error);
    
    return res.status(404).send(error);
  }
}

export const allMissionOfProject=async(req:Request,res:Response)=>{
try {
  let mission = await MissionModel.find({projectId:req.body.id},{__v:0});
  // console.log(mission);
  
  const formattedData = mission.map(item => {
    return {
      id:item._id,
      discrption:item.discrption,
      statusId:item.statusId,
      projectId:item.projectId,
      date_created: dayjs(item.date_created).format('MM-DD-YYYY').toString(),
      endDate: dayjs(item.endDate).format('MM-DD-YYYY').toString(),
      remarks:item.remarks,
      
taskType:item.taskType
    };
  });
  
  
return res.json(formattedData);
} catch (error) {
  return res.send(error);
}
}










