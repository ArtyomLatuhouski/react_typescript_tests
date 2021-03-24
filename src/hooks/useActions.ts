import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import * as UserActionCreators from "../store/action_creators/user"


export const useActions = () =>{
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators,dispatch)
}
