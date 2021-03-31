
//outer
import React from 'react'
import {Route, Switch} from "react-router"

//local
import './App.css'
import NavigateBlock from "./components/header/NavigateBlock"
import AjaxComponent from "./components/body/AjaxCoponent";
import SceneComponent from "./components/body/sceneComponent/SceneComponent";
import GeoMatComponent from "./components/body/geoMatComponent/GeoMatComponent";
import CameraComponent from "./components/body/cameraComponent/CameraComponent";
import Other from "./components/body/other/Other";
import BoxComponent from "./components/body/boxPhoto/BoxComponent";



function App() {

    return (
        <>
            <NavigateBlock/>
            <div className="bodyContainer">
                <Switch>
                    <Route exact path='/' render={():JSX.Element => <AjaxComponent/>}/>
                    {/*<Route exact path='/scene' render={():JSX.Element => <SceneComponent/>}/>*/}
                    <Route exact path='/camera' render={():JSX.Element => <CameraComponent/>}/>
                    <Route exact path='/box' render={():JSX.Element => <BoxComponent/>}/>
                    <Route exact path='/other' render={():JSX.Element => <Other/>}/>
                </Switch>
            </div>

        </>
    );
}

export default App;
