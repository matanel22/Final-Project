"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createMission_1 = require("../function/createMission");
const fonctionUsers_1 = require("../function/fonctionUsers");
const functionProject_1 = require("../function/functionProject");
const addNewProject_1 = require("../function/addNewProject");
const fonctionMission_1 = require("../function/fonctionMission");
const fonctionUsers_2 = require("../function/fonctionUsers");
const router = express_1.default.Router();
// routers of users
router.post('/login', fonctionUsers_1.login);
router.get("/userInfo", fonctionUsers_2.userInfo);
router.post('/validatIsUsers', fonctionUsers_1.validatIsUsers);
//routers of project
router.get('/allProjects', functionProject_1.allProject);
router.post("/addCreatProject", addNewProject_1.addCreatProject);
router.post('/allMissionOfProject', functionProject_1.allMissionOfProject);
router.get('/specificProject ', functionProject_1.specificProject);
// router.delete('/deleteSpcificProject/:id',deleteSpcificProject)
router.put('/updateProject/:id', functionProject_1.updateProject);
//routers of tasks;
router.post('/creatMission', createMission_1.createMission);
router.get('/specificMission', fonctionMission_1.specificMission);
router.put('/updateMission', fonctionMission_1.updateMission);
router.delete('/deleteSpcificMission/:id', fonctionMission_1.deleteSpcificMission);
exports.default = router;
