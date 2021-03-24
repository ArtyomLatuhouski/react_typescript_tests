// OUTER
import React, {useState, useEffect} from 'react';


//LOCAL
import {useTypeSelector} from "../hooks/useTypedSelector";


const UserList:React.FC=()=> {
    const {users,error,loading} = useTypeSelector(state => state.user)
  return (
    <div>

    </div>
  )
}

export default UserList
