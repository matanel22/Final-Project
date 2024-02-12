import { atom } from "recoil";
// import { IFormMission } from "../tasks/TasksList";
interface IFormMission {
    id: string;
    discrption: string;
    statusId: string;
    projectId: string;
    date_created: Date;
    endDate:  Date ;
    remarks: string;
    taskType:string;
  }
  export interface IProps {
    _id: string;
    nameProject: string;
    // userId:string
    staff: string[];
    client: string;
    statusProject: string;
  projectNumber: string;
    
    amountOfUsers: string;
  }

  interface IUsers{
    _id: string,
    name: string,
    email:string,
    pass:string,
    role: string,
    data_created:Date,

    permissions: boolean
  }

 const TasksData= atom<IFormMission[]>({
    default: [],
    key:'todo'
})
export default TasksData
export const userName=atom<string>({
  default :"",
  key:"name"
})

    export const idPrj=atom({
        default:'',
        key:"id"

    })

    export const missionProj=atom({
        default:[],
        key:"refresh"
    })

  export const AllProjectData=atom<IProps[]>({
    default:[],
    key:"projectData"

  })
  export const searchPro=atom({
    default:"",
    key:"serach"
  })
  export const searchTask=atom({
    default:"",
    key:"serachTask"
  })
  
  export const userId=atom<string>({
    default:"",
    key:"_id"

  })
  export const token=atom<object>({
    default:{},
    key:"token"

  })
  export const allUsers=atom<IUsers[]>({
    default:[],
    key:""
  })
  export const UserInfo=atom<IUsers>({
    default:{ 
      _id: "",
      name: "",
      email:"",
      pass:"",
      role: "",
      data_created:new Date,
      permissions: false},
      key:"userInfo"
  })

