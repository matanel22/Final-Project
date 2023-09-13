interface State {
  userName: string;
  email: string;
  password: string;
}
export const INITIAL_STATE: State = {
  userName: "",
  email: "",
  password: "",
};
type Action =
  | { type: "CHENGE_INPUT"; payload: object }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string };

export const postReduser = (state: any, action: any) => {
  switch (action.type) {
    case "CHENGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        error: false,
      };
    case "FATCH_SUCCESS":
      return {
        ...state,
        error: false,
      };
    case "FATCH_ERROR":
      return {
        [action.payload.name]: "",
        error: true,
      };
    default:
      return state;
  }
};

//-----------------------------------------------------------------------------------------------

// export const foolNameReducer = (state: any, action: any) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.valFN, isValid: action.valFN.trim().length > 0 };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.trim().length > 0 };
//   }
//   return { value: "", isValid: false };
// };

// export const emailReducer = (state: any, action: any) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };
// export const passReducer = (state: any, action: any) => {
//   if (action.def === "PASS_INPUT") {
//     return { value: action.valPass, isValid: action.valPass.trim().length > 3 };
//   }
//   if (action.def === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.trim().length > 3 };
//   }
// };
