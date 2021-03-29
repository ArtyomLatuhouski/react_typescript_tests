// OUTER
import React, {useEffect, useRef} from 'react'


//LOCAL
import {Creator} from "../../utilits/elementCreator";
import {generationCubs} from "../../utilits/creatMashElemFunctions";
import {creatScene} from "../../utilits/creatSceneFunction";
import * as THREE from "three";


const CameraFirst: React.FC = (props) => {
    const canvasElemRef = useRef(null)

    // creat elements for canvas
    const scene = creatScene()
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5000)
    const elements = generationCubs(5, 5)

    // creat canvas object
    const canvasObject = new Creator(elements, scene, camera)

    // add canvas to ref element and start animation
    useEffect(() => canvasObject.init(canvasElemRef), [])

    return (

        <div ref={canvasElemRef}>

        </div>
    )
}

export default CameraFirst
