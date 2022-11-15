import { Request,Response,NextFunction} from 'express';


import  jwt  from 'jsonwebtoken';


const authToken=(req:Request,res:Response,next:NextFunction)=>{
let token:any=req.header("x-api-key");
if(!token){
    res.status(401).json({msg:"token err 111"})
}
try {
let decoToken=jwt.verify(token,"matanel");
req.body.tokendata=decoToken;
next();
} catch (error) {
    res.status(401).json({error:"4444"})
}

}
export default authToken