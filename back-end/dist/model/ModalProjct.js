"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validProject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const ProjectScama = new mongoose_1.default.Schema({
    id: String,
    nameProject: String,
    client: String,
    staff: String,
    statusProject: String,
    amountOfUsers: String
});
const PojectModel = mongoose_1.default.model('projects', ProjectScama);
exports.default = PojectModel;
const validProject = (_validData) => {
    let joiSchema = joi_1.default.object({
        nameProject: joi_1.default.string().min(2).max(99).required(),
        staff: joi_1.default.string().min(2).max(99).required(),
        client: joi_1.default.string().min(3).max(50).required(),
        statusProject: joi_1.default.string().min(0).max(50).required(),
        amountOfUsers: joi_1.default.string().min(0).max(50).required(),
    });
    return joiSchema.validate(_validData);
};
exports.validProject = validProject;
