// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {MutableRefObject} from "react"
import {creatScene} from "./scene&camera";
import React from 'react'


type Light = THREE.DirectionalLight | THREE.PointLight | THREE.HemisphereLight
type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera

//  !! function for creat canvas object

export class BaseCreator {
    private scene: THREE.Scene;
    init: (mount: (HTMLElement | React.MutableRefObject<null>)) => void;
    private renderer: THREE.WebGLRenderer;
    private startAnimation: () => void;
    private camera: Camera;
    private controls: OrbitControls | undefined;
    private width: number;
    private height: number;
    private mountTime: boolean;
    private canvas: HTMLCanvasElement | undefined;
    private onWindowResize: () => void;

    constructor(camera: Camera, width: number, height: number) {
        this.camera = camera
        this.scene = creatScene()
        this.width = width
        this.height = height
        this.mountTime = true
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        })

        this.init = (container: HTMLElement | MutableRefObject<any>, orbitControl: boolean = true) => {
            // enter size render window
            (<THREE.WebGLRenderer>this.renderer).setSize(this.width, this.height);

            // creat canvas element
            this.canvas = (<THREE.WebGLRenderer>this.renderer).domElement

            // add canvas element in DOM , "if" for don't canvas add in DOM more 1 time if useEffect call more 1 time
            // @ts-ignore // because на улице мороз ) не хочет оно ref ловить ...
            if (this.mountTime) container.current.appendChild(this.canvas) && (this.mountTime = false)

            // add orbit control to canvas
            if (!(this.camera instanceof THREE.CubeCamera) && orbitControl) this.controls = new OrbitControls(this.camera, this.canvas);

            // resize event on window
            window.addEventListener('resize', this.onWindowResize)

            // start animation
            this.startAnimation()
        }

        // start render
        this.startAnimation = () => {
            (<THREE.WebGLRenderer>this.renderer).render(this.scene, <THREE.PerspectiveCamera>this.camera);
            window.requestAnimationFrame(this.startAnimation);
        };

        this.onWindowResize = () => {
            if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = window.innerWidth / window.innerHeight;
            if (!(camera instanceof THREE.CubeCamera)) camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}

