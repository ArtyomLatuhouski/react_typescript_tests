import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from "three";
import {MutableRefObject} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


//  !! функция создания куба
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
}

//  !! функция создания куба кубов )
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

//  !! функция создания объекта

export class Creator {

    private element: THREE.Mesh | THREE.Mesh[];
    private scene: THREE.Scene;
    init: (mount: (HTMLElement | React.MutableRefObject<null>)) => void;
    private group: THREE.Group | null;
    private renderer: THREE.WebGLRenderer | undefined;
    private startAnimation: () => void;
    private camera: THREE.PerspectiveCamera | null;
    private controls: OrbitControls | undefined;
    private animationsObjects: any[]

    constructor(element: Mesh | Mesh[]) {
        this.element = element
        this.camera = null
        this.group = null
        this.scene = new THREE.Scene()
        this.animationsObjects = []
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        })

        this.init = (mount: HTMLElement | MutableRefObject<null>) => {
            const width = 900;
            const height = 400;

            this.camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
            this.camera.position.z = 15;
            // this.camera.position.y = 7;

            //добавляем элементы в сцену

            this.group = new THREE.Group();

            this.element instanceof Array
                ? (<THREE.Mesh[]>this.element).forEach(item => (<THREE.Group>this.group).add(item))
                : (<THREE.Group>this.group).add(this.element);

            this.group.position.set(0, 0, 0)
            this.scene.add(this.group)

            // сетка
            const helper = new THREE.GridHelper(100, 100);
            helper.position.y = -3;
            // @ts-ignore
            helper.material.opacity = 0.25;
            // @ts-ignore
            helper.material.transparent = true;
            this.scene.add(helper);

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
            //-

            //-
            // @ts-ignore // because на улице мороз ) не хочет оно ref ловить ...
            mount.current.appendChild(canvas);

            createMoveAnimation({
                mesh: this.group,
                startPosition: new THREE.Vector3(0, 10, 0),
                endPosition: new THREE.Vector3(0, 0,),
                array: this.animationsObjects
            })

            this.controls = new OrbitControls(this.camera, canvas);
            // @ts-ignore

            this.startAnimation()
        }

        // старт рендер функция
        this.startAnimation = () => {
            (<THREE.Group>this.group).rotation.x += 0.01;
            (<THREE.Group>this.group).rotation.y += 0.01;
            (<THREE.Group>this.group).rotation.z += 0.01;

            (<THREE.WebGLRenderer>this.renderer).render(this.scene, <THREE.PerspectiveCamera>this.camera);

            this.animationsObjects.forEach(mesh => {
                if (mesh.userData.clock && mesh.userData.mixer) {
                    mesh.userData.mixer.update(mesh.userData.clock.getDelta());
                }
            });
            window.requestAnimationFrame(this.startAnimation);
        };
    }
}

function createMoveAnimation({
                                 // @ts-ignore
                                 mesh,
                                 // @ts-ignore
                                 startPosition,
                                 // @ts-ignore
                                 endPosition,
                                 // @ts-ignore
                                 array
                             }) {
    mesh.userData.mixer = new THREE.AnimationMixer(mesh);
    let track = new THREE.VectorKeyframeTrack(
        '.position', [0, 5, 10], [
            startPosition.x,
            startPosition.y,
            startPosition.z,
            endPosition.x,
            endPosition.y,
            endPosition.z,
        ]
    );
    const animationClip = new THREE.AnimationClip("upElement", 5, [track]);
    const animationAction = mesh.userData.mixer.clipAction(animationClip);
    animationAction.setLoop(THREE.LoopOnce);
    animationAction.play();
    mesh.userData.clock = new THREE.Clock();
    array.push(mesh);
}
