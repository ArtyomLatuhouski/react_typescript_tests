// OUTER
import React, {useState, useEffect, useRef,useMemo} from 'react'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//LOCAL



const CameraFirst: React.FC = () => {
    const canvasElem = useRef(null)

    const [scene,setScene] = useState(new THREE.Scene())
    const [camera,setCamera] = useState(new THREE.PerspectiveCamera())
    const [renderer,setRenderer] = useState({})

    useEffect( ()=>{
         sceneSetup()
        console.log(canvasElem.current)
    },[])

    function sceneSetup() {
        const width =500;
        const height =500;

        let scene = new THREE.Scene();
        // setScene(scene)

        let camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            // width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );

        camera.position.z = 9;

        // @ts-ignore
        const controls = new OrbitControls( camera, canvasElem.current);


        let renderer = new THREE.WebGLRenderer( );
        renderer.setSize(width, height);

        // @ts-ignore
        canvasElem.current.appendChild(renderer.domElement)

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add(cube)

        const lights:any[] = [];
        //
        // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        //
        // lights[ 0 ].position.set( 0, 200, 0 );
        // lights[ 1 ].position.set( 100, 200, 100 );
        // lights[ 2 ].position.set( - 100, - 200, - 100 );
        //
        // scene.add( lights[ 0 ] );
        // scene.add( lights[ 1 ] );
        // scene.add( lights[ 2 ] );

        function render() {
            requestAnimationFrame(render);

            // sphere.rotation.x += 0.01
            renderer.render(scene, camera);
        }

        render();
    };


    return (

        <div ref={canvasElem} style={{width:"200px",height:"200px"}} >

        </div>
    )
}

export default CameraFirst
