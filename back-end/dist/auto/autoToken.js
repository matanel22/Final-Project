"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authToken = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        res.status(401).json({ msg: "token err 111" });
    }
    try {
        let decoToken = jsonwebtoken_1.default.verify(token, "matanel");
        req.body.tokendata = decoToken;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "4444" });
    }
};
exports.default = authToken;
