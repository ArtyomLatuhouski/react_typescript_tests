
//outer
import React from 'react'
import {Route, Switch} from "react-router"


//local
import './App.css'
import NavigateBlock from "./components/header/NavigateBlock"
import AjaxComponent from "./components/body/AjaxCoponent";


function App() {


    return (
        <>
            <NavigateBlock/>
            <Switch>
                <Route exact path='/' render={() => <AjaxComponent/>}/>
            </Switch>

        </>
    );
}

export default App;
