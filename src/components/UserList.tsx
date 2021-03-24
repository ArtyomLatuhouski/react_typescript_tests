// OUTER
import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

//LOCAL
import {useTypeSelector} from "../hooks/useTypedSelector";
import {fetchUsers} from "../store/action_creators/user";


const UserList: React.FC = () => {
    const {users, error, loading} = useTypeSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    if (loading) return <h1>Loading ...</h1>
    if (error) return <h1> {error} </h1>

    return (
        <div>
            {users.map(user=><div key={user.id}>{user.name}</div>)}
        </div>
    )
}

export default UserList
