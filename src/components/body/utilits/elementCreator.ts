// outer
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from "three";
import {MutableRefObject} from "react";
import {getGLTElement, getOBJElement} from "./creatImportElements";
import {creatGrid} from "./otherConstructors";


type Light = THREE.DirectionalLight | THREE.PointLight | THREE.HemisphereLight
type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera

//  !! function for creat canvas object

export class Creator {

    private element: THREE.Mesh | THREE.Mesh[];
    private scene: THREE.Scene;
    init: (mount: (HTMLElement | React.MutableRefObject<null>)) => void;
    private group: THREE.Group | null;
    private renderer: THREE.WebGLRenderer | undefined;
    private startAnimation: () => void;
    private camera: Camera;
    private controls: OrbitControls | undefined;
    private animationsObjects: any[]
    private lights: Light | Light[] | null;
    width: number;
    private height: number;
    private grid: THREE.GridHelper | null | undefined;
    private mountTime: boolean;
    setWidth: (width: number) => void;
    addGrid: () => void;
    addElement: (element: (Mesh | Mesh[]), inGroup?: boolean, x?: number, y?: number, z?: number) => void;




    constructor(element: Mesh | Mesh[], scene: THREE.Scene, camera: Camera, width: number, height: number, grid?: THREE.GridHelper | null, lights?: Light | Light [] | null) {
        this.element = element
        this.camera = camera
        this.group = null
        this.scene = scene
        this.animationsObjects = []
        this.lights = lights || null
        this.width = width
        this.height = height
        this.grid = grid
        this.mountTime = true
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        })

        this.setWidth = (width: number) => {
            this.width = this.width + width
            console.log(this.width)
        }

        this.addGrid = () => {
            let grid = creatGrid()
            this.scene.add(grid)
        }

        this.addElement=(element: Mesh | Mesh[],inGroup:boolean=false,x:number=0,y:number=0,z:number=0)=>{
            console.log(this.group)
            if (inGroup && element instanceof Array) (<THREE.Group>this.group).add(...element)
            else if (inGroup && element instanceof Mesh) {
                (<THREE.Group>this.group).add(element)
                return
            }

            const addGroup = new THREE.Group();

            element instanceof Array
                ? (<THREE.Group>addGroup).add(...element)
                : (<THREE.Group>addGroup).add(element);

            addGroup.position.set(x, y, z)
            this.scene.add(addGroup)
        }
        this.init = (mount: HTMLElement | MutableRefObject<any>) => {
            console.log(22)
            // add elements in scene
            this.group = new THREE.Group();

            this.element instanceof Array
                ? (<THREE.Group>this.group).add(...this.element)
                : (<THREE.Group>this.group).add(this.element);

            this.group.position.set(0, 0, 0)
            this.scene.add(this.group)

            // add grid in scene
            if (this.grid) this.scene.add(this.grid);

            // add light in scene
            if (this.lights) this.lights instanceof Array
                ? this.scene.add(...this.lights)
                : this.scene.add(this.lights);

            // enter size render window
            (<THREE.WebGLRenderer>this.renderer).setSize(this.width, this.height);

            // creat canvas element
            const canvas = (<THREE.WebGLRenderer>this.renderer).domElement

            // add canvas element in DOM , "if" for don't canvas add in DOM more 1 time if useEffect call more 1 time
            console.log("add", this.mountTime)
            if (this.mountTime) {
                this.mountTime = false
                console.log("after", this.mountTime)
                console.log(this)
                // @ts-ignore // because на улице мороз ) не хочет оно ref ловить ...
                mount.current.appendChild(canvas)
            }

            if (!(this.camera instanceof THREE.CubeCamera)) this.controls = new OrbitControls(this.camera, canvas);

            getGLTElement('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', this.scene)

            getOBJElement('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', this.scene, 6, 0, -6)

            this.startAnimation()
        }


        // createMoveAnimation({
        //     mesh: this.group,
        //     startPosition: new THREE.Vector3(0, 10, 0),
        //     endPosition: new THREE.Vector3(0, 0,),
        //     array: this.animationsObjects
        // })

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
