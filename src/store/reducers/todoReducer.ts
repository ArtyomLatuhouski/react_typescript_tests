// outer


//local
import {TodoActions, TodoActionsTypes, TodoState} from "../../types/todoReducerUtilites";


const initialTodoState :TodoState={
    todos: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10
}


export const todoReducer =
    (state: TodoState=initialTodoState, action: TodoActions): TodoState => {
    switch (action.type) {
        case TodoActionsTypes.FETCH_TODO:
            return {...state,loading:true}
        case TodoActionsTypes.FETCH_TODO_ERROR:
            return {...state,loading:false,error:action.payload}
        case TodoActionsTypes.FETCH_TODO_SUCCESS:
            return {...state,loading:false,todos:action.payload}
        case TodoActionsTypes.SET_TODO_PAGE:
            return {...state,loading:false,page:action.payload}

        default:
            return state
    }
}
