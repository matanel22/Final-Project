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
exports.createMission = void 0;
const modelMission_1 = __importDefault(require("../model/modelMission"));
const createMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let validata=validTasks(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
    try {
        let dataTask = yield new modelMission_1.default(req.body);
        dataTask.save();
        res.json(dataTask);
    }
    catch (error) {
        res.json({ err: "error", error });
    }
});
exports.createMission = createMission;
