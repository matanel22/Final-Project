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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validProject = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const ProjectScama = new mongoose_1.default.Schema({
    id: String,
    userId: { type: [mongoose_1.Schema.Types.ObjectId], ref: "IUsers", required: true },
    nameProject: String,
    client: String,
    staff: String,
    statusProject: String,
    amountOfUsers: String
});
const ProjectModel = mongoose_1.default.model('projects', ProjectScama);
exports.default = ProjectModel;
const validProject = (_validData) => {
    let joiSchema = joi_1.default.object({
        // userId:Joi.string(),
        nameProject: joi_1.default.string().min(2).max(99).required(),
        staff: joi_1.default.string().min(2).max(99).required(),
        client: joi_1.default.string().min(3).max(50).required(),
        statusProject: joi_1.default.string().min(0).max(50).required(),
        amountOfUsers: joi_1.default.string().min(0).max(50).required(),
    });
    return joiSchema.validate(_validData);
};
exports.validProject = validProject;
