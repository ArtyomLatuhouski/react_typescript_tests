// OUTER
import React, { useEffect, useRef} from 'react'
import {Creator} from "../../utilits/elementCreator";
import {generationCubs} from "../../utilits/creatMashElemFunctions";



//LOCAL



const CameraFirst: React.FC = (props) => {
    const canvasElem = useRef(null)

    const element = new Creator(generationCubs(5, 5))



    useEffect(() => element.init(canvasElem), [])
    return (

        <div ref={canvasElem}>

        </div>
    )
}

export default CameraFirst
