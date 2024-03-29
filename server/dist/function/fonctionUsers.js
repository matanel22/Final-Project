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
exports.updatePermissionUser = exports.userLogout = exports.userInfo = exports.login = exports.signUp = exports.usersSpecific = exports.allUsers = void 0;
const ModelUser_1 = __importStar(require("../model/ModelUser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield ModelUser_1.default.find({});
        return res.json(users);
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.allUsers = allUsers;
const usersSpecific = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield ModelUser_1.default.findOne({ _id: req.body._id });
        return res.send(user);
    }
    catch (error) {
        return res.status(404).send(error);
    }
});
exports.usersSpecific = usersSpecific;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let validata = (0, ModelUser_1.validUser)(req.body);
    if (validata.error) {
        return res.status(404).json(validata.error.details);
    }
    else {
        try {
            let user = yield new ModelUser_1.default(req.body);
            user.pass = yield bcrypt_1.default.hash(user.pass, 10);
            user.permissions = false;
            user.save();
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ err: "email llegal" });
        }
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  let validata=validMustUser(req.body);
    // if(validata.error){
    //   return res.status(404).json(validata.error.details)
    //  }
    let user = yield ModelUser_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ msg: "user not found" });
    }
    let passValid = yield bcrypt_1.default.compare(req.body.pass, user.pass);
    console.log(passValid);
    if (!passValid) {
        return res.status(404).json({ msg: "Incorrect password" });
    }
    let newToken = (0, ModelUser_1.genToken)(user._id);
    return res.json({ token: newToken });
});
exports.login = login;
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.header("x-api-key");
        if (!token) {
            return res.status(404).json("your most connect");
        }
        let docoToken = jsonwebtoken_1.default.verify(token, "matanel");
        let user = yield ModelUser_1.default.find({ _id: docoToken });
        return res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userInfo = userInfo;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const deleteUser=await UsersModel.deleteOne({_id:req.body.id})
        // res.send(deleteUser)
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("somting is wrong");
    }
});
exports.userLogout = userLogout;
const updatePermissionUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameUserUpdate = yield ModelUser_1.default.updateOne({ _id: req.body.updateUserById }, { $set: { permissions: req.body.namePermission.trim() === "מנהל" ? true : false } });
        res.send(nameUserUpdate);
    }
    catch (error) {
        console.log(error);
        res.status(400).send("sumting is worng");
    }
});
exports.updatePermissionUser = updatePermissionUser;
