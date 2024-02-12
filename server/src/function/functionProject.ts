import { Request,Response } from "express";
import ProjectModel from "../model/ModalProjct";
import ModalProject, { validProject } from "../model/ModalProjct";
import MissionModel from "../model/modelMission";
import UsersModel from "../model/ModelUser";
import dayjs from "dayjs";
import { log } from "console";
import mongoose, { Mongoose } from "mongoose";

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
  // console.log(req.body.filteredNames);
  
    let nameSearch= req.body.filteredNames;
    // console.log(nameSearch);
    const searchQuery = {
      $or: [
        { nameProject: { $regex: nameSearch, $options: 'i' } }, 
        { projectNumber: { $regex: nameSearch, $options: 'i' } },
        { statusProject: { $regex: nameSearch, $options: 'i' } }
      ]
    };
    let find=await ModalProject.find(searchQuery);
  // let find= projects.filter(item => item.nameProject === nameSearch);
  // console.log(nameSearch);
  
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

 
  
  try {

   
    // console.log(req.body.staff);
    
    // let proj:IProps=await ProjectModel.findOne({_id:req.body._id})
    console.log(req.body.staff ,"req.body.staff");
    
//     const users = await UsersModel.find({ });
// for (let user of users){

// }
// console.log("use",users);
console.log(req.body);

    const updateDataProj=await ProjectModel.updateOne({_id:req.body._id},{
      // _id:req.body._id,
      $set: {
        staff: req.body.staff,
        statusProject: req.body.statusProject,
        amountOfUsers: req.body.amountOfUsers,
        nameProject: req.body.nameProject,
        client: req.body.client
      }
    })
    
   console.log(updateDataProj);
   
return res.send("updateDataProj")
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




export const testingFonction=async(req:Request,res:Response)=>{
const {a,b,c}=req.body;

let aAndb:any=[];

for(let i = 0;i<a.length;i++){
  let k=i+1;
  
  if (i < a.length) {
    aAndb.push(a[i]);
}
if (i < b.length) {
    aAndb.push(b[i]);
}



}
let newArr:string[]=[]

for (let i=0;i<aAndb.length;i++){
for (let x=0;x<c.length;x++){
  if(c[x]===aAndb[i]){
    newArr.push(aAndb[i-1]);
    break
  }
}
}
console.log(newArr);
res.send(newArr)

}





