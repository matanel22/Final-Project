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
exports.accomplished = exports.allStatusMission = exports.deleteSpcificMission = exports.taskOne = exports.updateMission = exports.specificMission = void 0;
const ModalProjct_1 = __importDefault(require("../model/ModalProjct"));
const modelMission_1 = __importDefault(require("../model/modelMission"));
const ModalStatus_1 = __importDefault(require("../model/ModalStatus"));
const dayjs_1 = __importDefault(require("dayjs"));
const specificMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield modelMission_1.default.find({ _id: req.body.id });
        return res.json(task);
    }
    catch (error) {
        res.send(error);
    }
});
exports.specificMission = specificMission;
const updateMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const validTaskData=validTasks(req.body)
        // if(validTaskData.error){
        // console.log(validTaskData.error);
        //   return res.sendStatus(404).send(validTaskData.error)
        // }
        let validProId = yield ModalProjct_1.default.findOne({ _id: req.body.projectId });
        if (validProId) {
            let updateMissionData = yield modelMission_1.default.updateOne({ _id: req.body.id }, {
                // _id:req.body.id,
                discrption: req.body.discrption,
                statusId: req.body.statusId,
                projectId: req.body.projectId,
                date_created: (0, dayjs_1.default)(req.body.date_created).format('MM-DD-YYYY').toString(),
                endDate: (0, dayjs_1.default)(req.body.endDate).format('MM-DD-YYYY').toString(),
                remarks: req.body.remarks
            });
            return res.send(updateMissionData);
        }
        // else return res.send("not found")
    }
    catch (error) {
        return res.status(404).send(error);
    }
});
exports.updateMission = updateMission;
const taskOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield modelMission_1.default.findOne({ _id: req.body._id });
        if (task) {
            const sendTask = {
                id: task._id,
                discrption: task.discrption,
                statusId: task.statusId,
                projectId: task.projectId,
                date_created: (0, dayjs_1.default)(task.date_created).format("YYYY-MM-DD"),
                endDate: (0, dayjs_1.default)(task.endDate).format("YYYY-MM-DD"),
                remarks: task.remarks
            };
            // console.log(sendTask);
            return res.send(sendTask);
        }
        else {
            res.sendStatus(404);
        }
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
        const statusTask = yield ModalStatus_1.default.find({});
        res.send(statusTask);
    }
    catch (error) {
        res.status(404).send("somting is wrong");
    }
});
exports.allStatusMission = allStatusMission;
const accomplished = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allMission = yield modelMission_1.default.find({ missionAccoplished: true });
    console.log(allMission);
    res.send(allMission);
});
exports.accomplished = accomplished;
