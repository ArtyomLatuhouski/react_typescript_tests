//outer
import React from 'react'
import {Route, Switch} from "react-router"

//local
import './App.css'
import UserList from "./components/UserList"
import TodoList from "./components/TodoList"
import NavigateBlock from "./components/header/NavigateBlock"


function App() {


    return (
        <>
            <NavigateBlock/>
            <Switch>
                <Route exact path='/' render={() => <div className="body__container">
                    <UserList/>
                    <br/>
                    <TodoList/>
                </div>}/>
            </Switch>

        </>
    );
}

export default App;
