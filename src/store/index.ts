//outer
import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

//local
import {rootReducer} from "./reducers/rootReducer"


export  const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
