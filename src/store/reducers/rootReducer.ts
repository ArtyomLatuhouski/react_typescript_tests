// outer
import {combineReducers} from "redux";

//local
import {userReducer} from "./userReducer";
import {todoReducer} from "./todoReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    todo : todoReducer
})


// creat hok

export type RootState = ReturnType<typeof rootReducer>
