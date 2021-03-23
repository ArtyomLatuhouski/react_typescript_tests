//outer
import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk";

//local
import {rootReducer} from "./reducers/rootReducer";

export  const store = createStore(rootReducer,applyMiddleware(thunk))
