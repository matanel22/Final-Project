import { atom } from "recoil";
interface IFormMission {
   
    _id: String;
    discrption: String;
    missionStatus: String;
    projectId: String;
    date_created: Date;
    endDate:  Date ;
    remarks: String;
  }
  export interface IProps {
    _id: string;
    nameProject: string;
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

    export const  missionProj=atom({
        default:[],
        key:"refresh"
    })

  export const DP=atom<IProps[]>({
    default:[],
    key:""

  })
  export const userId=atom<string>({
    default:"",
    key:"_id"

  })
  export const token=atom<object>({
    default:{},
    key:"token"

  })

