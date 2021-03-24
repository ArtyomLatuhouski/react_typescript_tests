// outer
import {combineReducers} from "redux";

//local
import {userReducer} from "./userReducer";


export const rootReducer = combineReducers({
    user: userReducer
})


// creat hok

export type RootState = ReturnType<typeof rootReducer>
