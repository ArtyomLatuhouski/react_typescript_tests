// OUTER
import React, {useState, useEffect} from 'react'


//LOCAL
import UserList from "../UserList";
import TodoList from "../TodoList";




const AjaxComponent: React.FC = () => {
    return (
        <>

            <UserList/>
            <br/>
            <TodoList/>

        </>
    )
}

export default AjaxComponent
