
import express from 'express';
import { createMission } from '../function/createMission';
import {login,validatIsUsers} from '../function/fonctionUsers'
import {  allMissionOfProject, allProject, specificProject, updateProject } from '../function/functionProject';
import { addCreatProject } from '../function/addNewProject';
import { deleteSpcificMission, specificMission, updateMission } from '../function/fonctionMission';
import { userInfo } from '../function/fonctionUsers';
import authToken from '../auto/autoToken';

const router = express.Router();
// routers of users
router.post('/login',login);
router.get("/userInfo",userInfo)

router.post('/validatIsUsers',validatIsUsers);

//routers of project
router.get('/allProjects',allProject)
router.post("/addCreatProject",addCreatProject)
router.post('/allMissionOfProject',allMissionOfProject)
router.get('/specificProject ',specificProject);
// router.delete('/deleteSpcificProject/:id',deleteSpcificProject)
router.put('/updateProject/:id',updateProject);
//routers of tasks;
router.post('/creatMission',createMission);
router.get('/specificMission',specificMission);
router.put('/updateMission',updateMission);
router.delete('/deleteSpcificMission/:id',deleteSpcificMission);

 export default router;

