
import express from 'express';
import { createMission } from '../function/createMission';
import {allUsers, deletedUser, login,signUp, updatePermissionUser, userLogout, usersSpecific} from '../function/fonctionUsers'
import {  allMissionOfProject, allProject, organizationFind, projSpecific, specificProject, testingFonction, updateProject } from '../function/functionProject';
import { addCreatProject} from '../function/addNewProject';
import { accomplished, allStatusMission, deleteSpcificMission, specificMission, taskByDate, taskOne, updateMission } from '../function/fonctionMission';
import { userInfo } from '../function/fonctionUsers';


const router = express.Router();
// routers of users
router.post('/login',login);
router.get("/userInfo",userInfo)
router.get("/allUsers",allUsers);
router.post('/signUp',signUp);
router.post('/usersSpecific',usersSpecific)
router.post('/logOutUser',userLogout)
router.post('/updatePermissionUser',updatePermissionUser)
router.post("/deletedUser",deletedUser)


router.post("/testingFonction",testingFonction)
router.post('/organizationFind',organizationFind)
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
router.get('/accomplishedMission',accomplished)
router.post('/taskByDate',taskByDate)
 export default router;

