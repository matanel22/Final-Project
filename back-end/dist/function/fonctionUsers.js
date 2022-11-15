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
exports.login = exports.validatIsUsers = void 0;
const ModelUser_1 = __importStar(require("../model/ModelUser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validatIsUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let validata = (0, ModelUser_1.validUser)(req.body);
    if (validata.error) {
        return res.status(404).json(validata.error.details);
    }
    else {
        try {
            let user = yield new ModelUser_1.default(req.body);
            user.pass = yield bcrypt_1.default.hash(user.pass, 10);
            user.save();
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ err: "email Illegal" });
        }
    }
});
exports.validatIsUsers = validatIsUsers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  let validata=validMustUser(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
    let user = yield ModelUser_1.default.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).json({ msg: "user not found" });
    }
    let passValid = yield bcrypt_1.default.compare(req.body.pass, user.pass);
    if (!passValid) {
        return res.status(404).json({ msg: "Incorrect pasword" });
    }
    let newToken = (0, ModelUser_1.genToken)(user._userId);
    res.json({ token: newToken });
});
exports.login = login;
