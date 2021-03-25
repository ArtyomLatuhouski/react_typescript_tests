import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from "three";
import {MutableRefObject} from "react";

export function addCustomSceneObjects(x:number,y:number,z:number) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(new THREE.Vector3(x, y, z))

    return cube
};

interface RefObject<T> {
    readonly current: T | null;
}

// type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera

export class Creator {

    private element: THREE.Mesh | THREE.Mesh[];
    private scene: THREE.Scene;
    init: (mount: (HTMLElement | React.MutableRefObject<null>)) => void;
    private groupStatus: boolean | undefined;
    private group: THREE.Group | null;
    private renderer: THREE.WebGLRenderer | undefined;
    startAnimation: () => void;
    private camera: THREE.PerspectiveCamera | null;
    private controls: OrbitControls | undefined;


    constructor(element: Mesh | Mesh[]) {
        this.element = element
        this.camera = null
        this.group = null
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer()

        this.init = (mount: HTMLElement | MutableRefObject<null>) => {
            const width = 900;
            const height = 300;

            this.camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
            this.camera.position.z = 15;

            // проверяем на группу и создаем
            // groupStatus ? this.group = new THREE.Group() : this.group = null

            //добавляем элементы в сцену
            if (element instanceof Array) {
                this.group = new THREE.Group();
                (<THREE.Mesh[]>this.element).forEach(item => (<THREE.Group>this.group).add(item))
                this.scene.add(this.group)
            } else (<THREE.Scene>this.scene).add(element);


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

            // @ts-ignore
            mount.current.appendChild(canvas);

            this.controls = new OrbitControls(this.camera, canvas);
            this.startAnimation()
        }

        this.startAnimation = () => {

            (<THREE.WebGLRenderer>this.renderer).render(this.scene, <THREE.PerspectiveCamera>this.camera);

            window.requestAnimationFrame(this.startAnimation);
        };
    }
}
