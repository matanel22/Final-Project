"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CompletedTaskScama = new mongoose_1.default.Schema({
    id: String,
    discription: String,
    statusTask: String,
});
const completedTasksModel = mongoose_1.default.model("completed_tasks", CompletedTaskScama);
exports.default = completedTasksModel;
