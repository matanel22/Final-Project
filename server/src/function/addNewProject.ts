import { Request,Response } from "express";
import ProjectModel from "../model/ModalProjct";
import ModalProject, { validProject } from "../model/ModalProjct";
import UsersModel from "../model/ModelUser";
import nodemailer, { Transporter } from 'nodemailer';
 


export const addCreatProject = async (req:Request,res:Response)=>{
        try {
let {data,selectedItems }=req.body;
const currentYear = new Date().getFullYear();
    
// Find the last project created in the current year
const lastProjectInCurrentYear = await ProjectModel.findOne({
  createdAt: {
    $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
    $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
  },
}, {}, { sort: { 'createdAt': -1 } });

let newProjectNumber;
if (lastProjectInCurrentYear) {
  // Type assertion to tell TypeScript that lastProjectInCurrentYear exists
  const lastProjectNumber = (lastProjectInCurrentYear as { projectNumber: string }).projectNumber;

  // Extract the last digits, increment them, and create the new project number
  const lastDigits = parseInt(lastProjectNumber.slice(-4));
  const newLastDigits = lastDigits + 1;
  newProjectNumber = `${currentYear}${newLastDigits.toString().padStart(4, '0')}`;
} else {
  // If no projects exist yet in the current year, start with PR-{year}-0001
  newProjectNumber = `${currentYear}0001`;
}


const subject=`${data.nameProject} הצטרפות לפרויקט`
const text =" ברכות על הצטרפותך לפרויקט שלנו"
const allUsers=await UsersModel.find({name:selectedItems})
        for(const user of allUsers){
            data.staff.push(user._id);
        }
        const userEmails = allUsers.map((user) => user.email);
            const newProject= await new ProjectModel({
            nameProject:data.nameProject,
            client:data.client,
            projectNumber:newProjectNumber,
            staff:data.staff,
            statusProject:data.statusProject,
            amountOfUsers:data.amountOfUsers,

           })
          
           newProject.save();
           const transporter: Transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: '49matanel@gmail.com', 
               pass: 'lrbz gcst wwgh lela',
             },
           });
           const mailOptions = {
             from: '49matanel@gmail.com',
             to: userEmails.join(', '), 
             subject: subject,
             text: text,
           };
         transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error); 
            return res.status(500).send(error.toString());
          }
          res.status(200).send('Email sent: ' + info.response);
        });
         
          
          
        }
          
        catch (error) {
            console.log(error);
            
            return res.status(404).json(error)
        }
     }
   

   