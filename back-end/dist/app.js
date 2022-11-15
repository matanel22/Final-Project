"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('./db/connectMongo');
const router_1 = __importDefault(require("./routs/router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
};
app.use((0, cors_1.default)(corsOption));
app.use('/api/routs/router', router_1.default);
app.listen(3001, () => {
    console.log("3001");
});
