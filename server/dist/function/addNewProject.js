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
exports.addCreatProject = void 0;
const ModalProjct_1 = __importDefault(require("../model/ModalProjct"));
const ModalProjct_2 = require("../model/ModalProjct");
const ModelUser_1 = __importDefault(require("../model/ModelUser"));
const addCreatProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let flag = false;
    let validata = (0, ModalProjct_2.validProject)(req.body);
    if (validata.error) {
        return res.status(404).json(validata.error.details);
    }
    else {
        try {
            let project = yield new ModalProjct_1.default(req.body);
            if (!project) {
                return res.json({ msg: "please try again" });
            }
            let user = yield ModelUser_1.default.find({});
            user.map((item, index) => {
                var _a;
                if (((_a = item.name) === null || _a === void 0 ? void 0 : _a.trim()) === project.staff) {
                    project.userId = item._id.toString();
                    project.save();
                    console.log(project.userId);
                    flag = true;
                    return res.json(project);
                }
            });
            if (!flag) {
                return res.json("dont found is developer");
            }
        }
        catch (error) {
            return res.status(404).json({ msg: error });
        }
    }
});
exports.addCreatProject = addCreatProject;
