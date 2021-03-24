// OUTER
import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

//LOCAL
import {useTypeSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";


const TodoList: React.FC = () => {
    const {page, error, todos, loading, limit} = useTypeSelector(state => state.todo)
    const {fetchTodos,setTodoPage} = useActions()
    const pages = [1, 2, 3, 4, 5]

    useEffect(() => {
        fetchTodos(page, limit)
    }, [page])


    if (loading) return <h1>Loading ...</h1>
    if (error) return <h1> {error} </h1>

    return (
        <div >
            {todos.map(todo => <div key={todo.id}>{todo.id}- {todo.title}</div>)}
            <div style={{display:"flex"}}>
                {pages.map((p => {
                    return <div
                        onClick={()=>setTodoPage(p)}
                        style={{border: p === page ? '2px solid green' : "1px solid gray", padding: "10px",cursor:"pointer",marginTop:"20px"}}>
                        {p}
                    </div>
                }))}
            </div>
        </div>
    )
}

export default TodoList
