"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StatusSchema = new mongoose_1.default.Schema({
    _id: String,
    name: String
});
const StatusModal = mongoose_1.default.model('status', StatusSchema);
exports.default = StatusModal;
