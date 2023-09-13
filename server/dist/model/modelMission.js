"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validTasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const MissionScama = new mongoose_1.default.Schema({
    id: String,
    discrption: String,
    statusId: String,
    projectId: String,
    date_created: {
        type: Date
    },
    endDate: { type: Date },
    remarks: String,
    missionAccoplished: Boolean,
    taskType: String
});
const MissionModel = mongoose_1.default.model('tesks', MissionScama);
exports.default = MissionModel;
const validTasks = (_validData) => {
    let joiSchema = joi_1.default.object({
        _id: joi_1.default.string().required(),
        discrption: joi_1.default.string().min(2).max(99),
        statusId: joi_1.default.string(),
        date_created: joi_1.default.date().required(),
        projectId: joi_1.default.string().required(),
        endDate: joi_1.default.date().required(),
        remarks: joi_1.default.string()
    });
    return joiSchema.validate(_validData);
};
exports.validTasks = validTasks;
