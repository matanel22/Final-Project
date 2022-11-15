
import express from 'express';
import { createMission } from '../function/createMission';
import {login,validatIsUsers} from '../function/fonctionUsers'
import {  allMissionOfProject, allProject, deleteSpcificProject, specificProject, updateProject } from '../function/functionProject';
import { addCreatProject } from '../function/addNewProject';
import { deleteSpcificMission, specificMission, updateMission } from '../function/fonctionMission';

const router = express.Router();
// routers of users
router.post('/login',login);
router.post('/user',validatIsUsers);
//routers of project
//routers of project
router.get('/allProjects',allProject)
router.post("/addCreatProject",addCreatProject)
router.post('/allMissionOfProject',allMissionOfProject)
router.get('/specificProject ',specificProject);
router.delete('/deleteSpcificProject/:id',deleteSpcificProject)
router.put('/updateProject',updateProject);
//routers of tasks;
router.post('/creatMission',createMission);
router.get('/specificMission',specificMission);
router.put('/updateMission',updateMission);
router.delete('/deleteSpcificMission',deleteSpcificMission);

 export default router;

