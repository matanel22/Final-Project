"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMissionOfProject = exports.updateProject = exports.projSpecific = exports.specificProject = exports.allProject = void 0;
const ModalProjct_1 = __importDefault(require("../model/ModalProjct"));
const ModalProjct_2 = __importDefault(require("../model/ModalProjct"));
const modelMission_1 = __importDefault(require("../model/modelMission"));
const ModelUser_1 = __importDefault(require("../model/ModelUser"));
const allProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield ModelUser_1.default.findOne({ _id: req.body.id });
        if (user === null || user === void 0 ? void 0 : user.permissions) {
            let projects = yield ModalProjct_2.default.find({});
            return res.json(projects);
        }
        else {
            let projects = yield ModalProjct_2.default.find({ userId: req.body.id });
            return res.json(projects);
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.allProject = allProject;
const specificProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let project = yield ModalProjct_2.default.find({ id: req.body.id });
        return res.json(project);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.specificProject = specificProject;
const projSpecific = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let project = yield ModalProjct_1.default.findOne({ _id: req.body.id });
        return res.send(project);
    }
    catch (error) {
        return res.status(404).send(error);
    }
});
exports.projSpecific = projSpecific;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proj = yield ModalProjct_1.default.findOne({ _id: req.body._id });
    try {
        let user = yield ModelUser_1.default.find({});
        // console.log(user);
        user.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.name === proj.staff) {
                proj.userId = item._id;
                let updateData = yield ModalProjct_1.default.updateOne({ _id: req.body._id }, req.body);
                return res.send(updateData);
            }
        }));
        console.log(proj);
    }
    catch (error) {
        console.log(error);
        return res.status(404).send(error);
    }
});
exports.updateProject = updateProject;
const allMissionOfProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mission = yield modelMission_1.default.find({ projectId: req.body.id }, { __v: 0 });
        return res.json(mission);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.allMissionOfProject = allMissionOfProject;
