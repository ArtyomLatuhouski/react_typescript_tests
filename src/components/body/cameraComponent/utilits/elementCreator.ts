import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from "three";
import {MutableRefObject} from "react";

export function creatBox(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const material = new THREE.MeshPhongMaterial({
        color: '#140ccd',
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(new THREE.Vector3(x, y, z))

    return cube
};


export function generationCubs(maxWidth: number, maxHeight: number) {
    let array = []

    function widthGeneration(maxWidth: number, height: number) {
        let width = []
        for (let i = 0; i < maxWidth; i++) {
            for (let j = 0; j < maxWidth; j++) {
                width.push(creatBox(i, j, height))
            }
        }
        return width
    }

    for (let i = 0; i < maxHeight; i++) {
        array.push(...widthGeneration(maxWidth, i))
    }
    return array

}

// type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera

export class Creator {

    private element: THREE.Mesh | THREE.Mesh[];
    private scene: THREE.Scene;
    init: (mount: (HTMLElement | React.MutableRefObject<null>)) => void;
    private group: THREE.Group | null;
    private renderer: THREE.WebGLRenderer | undefined;
    private startAnimation: () => void;
    private camera: THREE.PerspectiveCamera | null;
    private controls: OrbitControls | undefined;


    constructor(element: Mesh | Mesh[]) {
        this.element = element
        this.camera = null
        this.group = null
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        })

        this.init = (mount: HTMLElement | MutableRefObject<null>) => {
            const width = 900;
            const height = 300;

            this.camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
            this.camera.position.z = 13;

            //добавляем элементы в сцену

            this.group = new THREE.Group();

            this.element instanceof Array
                ? (<THREE.Mesh[]>this.element).forEach(item => (<THREE.Group>this.group).add(item))
                : (<THREE.Group>this.group).add(this.element);

            this.group.position.set(0, 0, -2)
            this.scene.add(this.group)

            // свет
            const lights = [];
            lights[0] = new THREE.PointLight(0xffffff, 1, 0);
            lights[1] = new THREE.PointLight(0xffffff, 1, 0);
            lights[2] = new THREE.PointLight(0xffffff, 1, 0);

            lights[0].position.set(0, 200, 0);
            lights[1].position.set(100, 200, 100);
            lights[2].position.set(-100, -200, -100);

            this.scene.add(lights[0]);
            this.scene.add(lights[1]);
            this.scene.add(lights[2]);

            (<THREE.WebGLRenderer>this.renderer).setSize(width, height);

            const canvas = (<THREE.WebGLRenderer>this.renderer).domElement

            // @ts-ignore // because на улице мороз ) не хочет оно ref ловить ...
            mount.current.appendChild(canvas);

            this.controls = new OrbitControls(this.camera, canvas);

            this.startAnimation()
        }

        this.startAnimation = () => {
            (<THREE.Group>this.group).rotation.x += 0.01;
            (<THREE.Group>this.group).rotation.y += 0.01;
            (<THREE.Group>this.group).rotation.z += 0.01;


            (<THREE.WebGLRenderer>this.renderer).render(this.scene, <THREE.PerspectiveCamera>this.camera);

            window.requestAnimationFrame(this.startAnimation);
        };
    }
}
