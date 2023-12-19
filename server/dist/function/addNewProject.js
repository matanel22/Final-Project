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
const ModelUser_1 = __importDefault(require("../model/ModelUser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const addCreatProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data, selectedItems } = req.body;
        // console.log(data,selectedItems );
        // const { to, subject, text } = req.body;
        const subject = `${data.nameProject} הצטרפות לפרוייקט`;
        const text = "ברכות על הצטרפות להיות חלק מהפרוויקט שלנו";
        const allUsers = yield ModelUser_1.default.find({ name: selectedItems });
        for (const user of allUsers) {
            data.userId.push(user._id);
        }
        const newProject = yield new ModalProjct_1.default({
            nameProject: data.nameProject,
            client: data.client,
            userId: data.userId,
            statusProject: data.statusProject,
            amountOfUsers: data.amountOfUsers,
        });
        console.log(newProject);
        newProject.save();
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: '49matanel@gmail.com',
                pass: 'matanelHadad94',
            },
        });
        const mailOptions = {
            from: '49matanel@gmail.com',
            to: '39teahila@gmail.com',
            subject: subject,
            text: text,
        };
        //  transporter.sendMail(mailOptions, (error, info) => {
        //   if (error) {
        //     console.error(error); // Log the error for debugging
        //     return res.status(500).send(error.toString());
        //   }
        //   // Send the project details in the response
        //   res.status(200).send('Email sent: ' + info.response);
        // });
        res.status(200).send(newProject);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json(error);
    }
});
exports.addCreatProject = addCreatProject;
