//outer
import {TypedUseSelectorHook, useSelector} from "react-redux";

//local
import {RootState} from "../store/reducers/rootReducer";


export  const useTypeSelector:TypedUseSelectorHook<RootState> =useSelector
