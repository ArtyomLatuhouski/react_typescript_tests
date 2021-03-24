export interface TodoState {
    todos: any[],
    loading: boolean,
    error: null | string,
    page: number,
    limit: number
}

export enum TodoActionsTypes {
    FETCH_TODO = "FETCH_TODO",
    FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS",
    FETCH_TODO_ERROR = "FETCH_TODO_ERROR",
    SET_TODO_PAGE = "SET_TODO_PAGE"
}

interface FetchTodoAction {
    type: TodoActionsTypes.FETCH_TODO
}

interface FetchTodoSuccessAction {
    type: TodoActionsTypes.FETCH_TODO_SUCCESS,
    payload: any[]
}

interface FetchTodoErrorAction {
    type: TodoActionsTypes.FETCH_TODO_ERROR,
    payload: string

}

interface SetTodoPageAction {
    type: TodoActionsTypes.SET_TODO_PAGE,
    payload: number
}


export type TodoActions =
    FetchTodoAction
    | FetchTodoSuccessAction
    | FetchTodoErrorAction
    | SetTodoPageAction
