"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.allStatusMission = exports.deleteSpcificMission = exports.taskOne = exports.updateMission = exports.specificMission = void 0;
const ModalProjct_1 = __importDefault(require("../model/ModalProjct"));
const modelMission_1 = __importStar(require("../model/modelMission"));
const ModalStatus_1 = __importDefault(require("../model/ModalStatus"));
const specificMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield modelMission_1.default.find({ id: req.body.id });
        return res.json(task);
    }
    catch (error) {
        res.send(error);
    }
});
exports.specificMission = specificMission;
const updateMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validTaskData = (0, modelMission_1.validTasks)(req.body);
        if (validTaskData.error) {
            console.log(validTaskData.error);
            return res.send(validTaskData.error);
        }
        let validProId = yield ModalProjct_1.default.findOne({ _id: req.body.projectId });
        if (validProId) {
            let updateMissionData = yield modelMission_1.default.updateOne({ _id: req.body._id }, req.body);
            return res.send(updateMissionData);
        }
        else
            return res.send("not found");
    }
    catch (error) {
        return res.status(404).send(error);
    }
});
exports.updateMission = updateMission;
const taskOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield modelMission_1.default.findOne({ _id: req.body._id });
        return res.send(task);
    }
    catch (error) {
        return console.log(error);
    }
});
exports.taskOne = taskOne;
const deleteSpcificMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let deleteMission = yield modelMission_1.default.deleteOne({ _id: req.params.id });
        return res.json(deleteMission);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.deleteSpcificMission = deleteSpcificMission;
const allStatusMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statusTask = yield ModalStatus_1.default.findOne({});
        console.log(statusTask);
        res.send(statusTask);
    }
    catch (error) {
        res.status(404).send("somting is wrong");
    }
});
exports.allStatusMission = allStatusMission;
