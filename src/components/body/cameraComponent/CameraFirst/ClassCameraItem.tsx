import React, { Component } from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BoxGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, StereoCamera} from "three";


class ClassCameraItem extends Component {

    private mount: any;
    private requestID: number | undefined;
    private controls: any;
    private scene: any;
    private camera: PerspectiveCamera | undefined | any;
    private renderer: any;
    private cube: Mesh<BoxGeometry, MeshPhongMaterial> | undefined | any;
    private cube2: Mesh<BoxGeometry, MeshPhongMaterial> | undefined | any;

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        this.mount.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        this.mount.removeEventListener('resize', this.handleWindowResize);
    }

    sceneSetup = () => {

        const width = 900;
        const height = 300;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );

        // this.camera = new THREE.OrthographicCamera( width / - 30, width / 30, height / 30, height / - 30, 1, 1000 );



        this.camera.position.z = 20;

        this.controls = new OrbitControls( this.camera, this.mount ); // надо разобраться

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement );
    };

    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );

        this.cube = new THREE.Mesh( geometry, material );
        this.cube2 = new THREE.Mesh( geometry, material );

        this.cube.position.copy(new THREE.Vector3(6,0,0))
        this.cube2.position.copy(new THREE.Vector3(-8,0,0))

        this.scene.add( this.cube );
        this.scene.add( this.cube2 );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.cube2.rotation.x += 0.01;
        this.cube2.rotation.y += 0.01;

        if (this.camera.position.z > 10) this.camera.position.z -= 0.1;
        // if (this.camera.position.x !== -2) this.camera.position.x -= 0.1;


        this.renderer.render( this.scene, this.camera );

        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();
    };

    render() {
        return <div style={{height:"300px"}} ref={ref => (this.mount = ref)}/>
    }
}


export default ClassCameraItem
