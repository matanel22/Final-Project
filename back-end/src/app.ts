import express from "express";
require ('./db/connectMongo')
import { Request, Response } from "express";
import router from './routs/router';
import cors from "cors";
const app = express();

app.use(express.json());

const corsOption = {
  origin:'http://localhost:3000', 
  credentials:true,
  method: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "x-api-key"],
};

app.use(cors(corsOption)); 

app.use('/api/routs/router',router);

app.listen(3001, () => {
  console.log("3001");
});

