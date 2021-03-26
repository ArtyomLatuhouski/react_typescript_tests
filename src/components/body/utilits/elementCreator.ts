// outer
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from "three";
import {MutableRefObject} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';

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
                5000
            );
            this.camera.position.z = 1115;
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
            helper.position.y = -1;
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

            // -
            {
                const skyColor = 0xB1E1FF;  // light blue
                const groundColor = 0xB97A20;  // brownish orange
                const intensity = 1;
                const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
                this.scene.add(light);
            }

            {
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.DirectionalLight(color, intensity);
                light.position.set(5, 10, 2);
                this.scene.add(light);
                this.scene.add(light.target);
            }
            const gltfLoader = new GLTFLoader();
            gltfLoader.load('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
                const root = gltf.scene;
                this.scene.add(root);
                // compute the box that contains all the stuff
                // from root and below
                const box = new THREE.Box3().setFromObject(root);

                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());

                // set the camera to frame the box
                // frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

                // update the Trackball controls to handle the new size
                // this.controls.maxDistance = boxSize * 10;
                // controls.target.copy(boxCenter);
                // controls.update();
            })
            // -

            // - импортируем модель по url
            const objLoader = new OBJLoader();
            objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj',
                (root: THREE.Object3D) => {
                root.position.set(6, 0, -6)
                this.scene.add(root);
            });
            //  -
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
