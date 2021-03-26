// OUTER
import React, {useState, useEffect, useRef, useMemo} from 'react'
import {creatBox, Creator,generationCubs} from "../utilits/elementCreator";
import {World} from "../utilits/creatImportElements";

//LOCAL



const CameraFirst: React.FC = () => {
    const canvasElem = useRef(null)

    // const element = new Creator([creatBox(0, 0, 0), creatBox(1, 0, 0)])

    const element = new Creator(generationCubs(5, 5))



    useEffect(() => element.init(canvasElem), [])
    return (

        <div ref={canvasElem}>

        </div>
    )
}

export default CameraFirst
