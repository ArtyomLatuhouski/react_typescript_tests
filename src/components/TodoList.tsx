// OUTER
import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

//LOCAL
import {useTypeSelector} from "../hooks/useTypedSelector";
import {fetchUsers} from "../store/action_creators/user";
import {useActions} from "../hooks/useActions";


const TodoList: React.FC = () => {
    const {page, error,todos,loading,limit} = useTypeSelector(state => state.todo)
    // const dispatch = useDispatch()
    const {} = useActions()


    useEffect(() => {
        // dispatch(fetchUsers())
        fetchUsers()
    }, [])


    if (loading) return <h1>Loading ...</h1>
    if (error) return <h1> {error} </h1>

    return (
        <div>
            {todos.map(todo=><div key={todo.id}>{todo.id}- {todo.name}</div>)}
        </div>
    )
}

export default TodoList
