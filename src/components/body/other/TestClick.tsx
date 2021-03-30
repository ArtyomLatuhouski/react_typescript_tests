// OUTER
import React, {useEffect, useRef, useState} from 'react'
import * as THREE from "three";

//LOCAL
import {creatBox, generationCubs} from "../utilits/creatMashElemFunctions";
import {Creator} from "../utilits/elementCreator";
import {lightThreePoints} from "../utilits/otherConstructors";
import {creatScene} from "../utilits/creatSceneFunction";


const TestClick: React.FC = (props) => {
    const canvasElemRef1 = useRef(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(600)

    // creat elements for canvas
    const scene = creatScene()

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
    camera.position.z = 21;

    const elements = generationCubs(5, 5)

    const lights = lightThreePoints()

    // creat canvas object
    const [canv,setCanv] = useState(new Creator(elements, scene, camera, width, height, null, lights))

    useEffect(()=>canv.addGrid(),[])

    useEffect(() => {
        console.log(333)
        canv.init(canvasElemRef1)
    }, [canv])

    useEffect(()=>canv.eventClick(),[])

    return (
        <>
            <div ref={canvasElemRef1}/>
        </>


    )
}

export default TestClick
