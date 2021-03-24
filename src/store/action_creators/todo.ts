// outer
import {Dispatch} from "redux";
import axios from "axios";


// local
import {TodoActions, TodoActionsTypes} from "../../types/todoReducerUtilites";


export const fetchTodos = (page = 1, limit = 10) => {
    return async (dispatch: Dispatch<TodoActions>) => {
        try {
            dispatch({type: TodoActionsTypes.FETCH_TODO})
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos",
                {
                    params: {_page: page, _limit: limit}
                })
            dispatch({type: TodoActionsTypes.FETCH_TODO_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: TodoActionsTypes.FETCH_TODO_ERROR, payload: ``})
        }
    }
}


export function setTodoPage(page: number):TodoActions {
    return {type:TodoActionsTypes.SET_TODO_PAGE,payload:page}
}

