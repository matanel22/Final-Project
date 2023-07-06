
import express from 'express';
import { createMission } from '../function/createMission';
import {allUsers, login,signUp, usersSpecific} from '../function/fonctionUsers'
import {  allMissionOfProject, allProject, projSpecific, specificProject, updateProject } from '../function/functionProject';
import { addCreatProject } from '../function/addNewProject';
import { allStatusMission, deleteSpcificMission, specificMission, taskOne, updateMission } from '../function/fonctionMission';
import { userInfo } from '../function/fonctionUsers';


const router = express.Router();
// routers of users
router.post('/login',login);
router.get("/userInfo",userInfo)
router.get("/allUsers",allUsers);
router.post('/signUp',signUp);
router.post('/usersSpecific',usersSpecific)

//routers of project
router.post('/allProjects',allProject)
router.post("/addCreatProject",addCreatProject)
router.post("/projSpecific",projSpecific)
router.post('/allMissionOfProject',allMissionOfProject)
router.get('/specificProject ',specificProject);
// router.delete('/deleteSpcificProject/:id',deleteSpcificProject)
router.put('/updateProject',updateProject);
//routers of tasks;
router.post("/taskOne",taskOne)
router.post('/creatMission',createMission);
router.get('/specificMission',specificMission);
router.put('/updateMission',updateMission);
router.delete('/deleteSpcificMission/:id',deleteSpcificMission);
router.get('/status',allStatusMission)

 export default router;

