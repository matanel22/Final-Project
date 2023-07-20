import { atom } from "recoil";
interface IFormMission {
   
    _id: String;
    discrption: String;
    statusId: String;
    projectId: String;
    date_created: Date;
    endDate:  Date ;
    remarks: String;
  }
  export interface IProps {
    _id: string;
    nameProject: string;
    userId:string
    staff: string;
    client: string;
    statusProject: string;
    amountOfUsers: string;
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
  export const userId=atom<string>({
    default:"",
    key:"_id"

  })
  export const token=atom<object>({
    default:{},
    key:"token"

  })
  

