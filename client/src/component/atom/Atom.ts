import { atom } from "recoil";

 const TasksData= atom<[]>({
    default: [],
    key:'todo'
})
export default TasksData


    export const idPrj=atom({
        default:'',
        key:"id"

    })
