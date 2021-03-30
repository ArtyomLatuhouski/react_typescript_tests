// OUTER
import React, {useEffect, useRef, useState} from 'react'
import * as THREE from "three";

//LOCAL
import {Creator} from "../../utilits/elementCreator";
import {creatBox, generationCubs} from "../../utilits/creatMashElemFunctions";
import {creatScene} from "../../utilits/creatSceneFunction";
import {lightThreePoints} from "../../utilits/otherConstructors";

const CameraFirst: React.FC = (props) => {
    const canvasElemRef = useRef(null)
    const [width, setWidth] = useState(900)
    const [height, setHeight] = useState(400)


    // creat elements for canvas
    const scene = creatScene()

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
    camera.position.z = 15;

    const elements = generationCubs(5, 5)

    const lights = lightThreePoints()

    // creat canvas object
    const [canv,setCanv] = useState(new Creator(elements, scene, camera, width, height, null, lights))
    // const canvas = useRef(new Creator(elements, scene, camera, width, height, null, lights))

    // add canvas in ref element and start animation
    // useEffect(() => canvas.current.add(canvasElemRef), [])
    useEffect(() => {
        console.log(333)
        canv.init(canvasElemRef)
    }, [canv])

    return (
        <>
            <div ref={canvasElemRef}/>
            <input type="button" onClick={() => {
                console.log(111)
                setCanv(prev=>{
                    let element = creatBox()
                    prev.addElement(element,true,3,4,4)
                    console.log(prev)
                    return prev
                })
            }}/>
        </>


    )
}

export default CameraFirst
