// OUTER
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";



// !! получение элемента с расшифровкой OBJ Loader
export function getOBJElement(url: string, scene: THREE.Scene, x: number = 0, y: number = 0, z: number = 0) {
    const objLoader = new OBJLoader();
    objLoader.load(url, (root: THREE.Object3D) => {
        root.position.set(x, y, z)
        scene.add(root)
    });
}


// !! получение элемента с расшифровкой GLTFLoader

export function getGLTElement(url: string, scene: THREE.Scene, x: number = 0, y: number = 0, z: number = 0) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(url, (gltf) => {
        console.log(gltf)
        const root = gltf.scene;
        console.log(root)
        root.position.set(x, y, z)
        scene.add(root);
    })
}
