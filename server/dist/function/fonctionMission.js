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
exports.deleteSpcificMission = exports.taskOne = exports.updateMission = exports.specificMission = void 0;
const modelMission_1 = __importDefault(require("../model/modelMission"));
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
        let updateData = yield modelMission_1.default.updateOne({ _id: req.body._id }, req.body);
        return res.send(updateData);
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
