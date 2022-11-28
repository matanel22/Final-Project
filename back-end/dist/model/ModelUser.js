"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validMustUser = exports.genToken = exports.validUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import authToken from "../auto/autoToken";
const UserSchema = new mongoose_1.default.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    permissions: String,
    name: String,
    email: String,
    pass: String,
    role: {
        type: String, default: 'regular'
    },
    data_created: {
        type: Date, default: Date.now()
    }
});
const UsersModel = mongoose_1.default.model('users', UserSchema);
exports.default = UsersModel;
const validUser = (_validData) => {
    let joiSchema = joi_1.default.object({
        // _id:string().required(),
        permissions: joi_1.default.string(),
        name: joi_1.default.string().min(2).max(99).required(),
        email: joi_1.default.string().min(2).max(99).required().email(),
        pass: joi_1.default.string().min(3).max(50).required(),
    });
    return joiSchema.validate(_validData);
};
exports.validUser = validUser;
const genToken = (_userId) => {
    const token = jsonwebtoken_1.default.sign({ _id: _userId }, "matanel", { expiresIn: "60mins" });
    return token;
};
exports.genToken = genToken;
const validMustUser = (_validData) => {
    let joiSchema = joi_1.default.object({
        email: joi_1.default.string().min(2).max(99).required().email(),
        pass: joi_1.default.string().min(3).max(50).required()
    });
    return joiSchema.validate(_validData);
};
exports.validMustUser = validMustUser;
