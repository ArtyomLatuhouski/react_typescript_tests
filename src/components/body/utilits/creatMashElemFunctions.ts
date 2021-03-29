// OUTER
import * as THREE from 'three';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// вспомогательные настройки ( типы , интерфейсы TS )

type MaterialConstructors = THREE.MeshPhongMaterial | THREE.MeshBasicMaterial | THREE.MeshLambertMaterial

type Geometries =
    THREE.BoxGeometry
    | THREE.CircleGeometry
    | THREE.ConeGeometry
    | THREE.CylinderGeometry
    | THREE.DodecahedronGeometry
    | THREE.EdgesGeometry
    | THREE.ExtrudeGeometry
    | THREE.IcosahedronGeometry
    | THREE.LatheGeometry
    | THREE.OctahedronGeometry
    | THREE.ParametricGeometry
    | THREE.PlaneGeometry
    | THREE.PolyhedronGeometry
    | THREE.RingGeometry
    | THREE.ShapeGeometry
    | THREE.SphereGeometry
    | THREE.TetrahedronGeometry
    | THREE.TextGeometry
    | THREE.TorusGeometry
    | THREE.TorusKnotGeometry
    | THREE.TubeGeometry
    | THREE.WireframeGeometry
//-

// функция возвращающая функцию конструктор элемента
function creatCreators(constructor: MaterialConstructors, geometry: Geometries) {

}


//  !! функция создания куба

export function creatBox(x: number = 0, y: number = 0, z: number = 0,
                         materialSettings?: MaterialConstructors,
                         width: number = 0.9, height: number = 0.9, depth: number = 0.9) {
    // геометрия куба
    const geometry = new THREE.BoxGeometry(width, height, depth);
    // материал куба
    const material = materialSettings || new THREE.MeshPhongMaterial({
        color: '#140ccd',
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    });
    // сборка куба
    const cube = new THREE.Mesh(geometry, material);
    // указание положения куба
    cube.position.copy(new THREE.Vector3(x, y, z))

    return cube
}


//  !! функция создания куба кубов )
export function generationCubs(maxWidth: number, maxHeight: number) {
    let array = []

    function widthGeneration(maxWidth: number, height: number) {
        let perimeter = []
        for (let i = 0; i < maxWidth; i++) {
            for (let j = 0; j < maxWidth; j++) {
                perimeter.push(creatBox(i, j, height))
            }
        }
        return perimeter
    }

    for (let i = 0; i < maxHeight; i++) {
        array.push(...widthGeneration(maxWidth, i))
    }
    return array
}

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
        const root = gltf.scene;
        root.position.set(x, y, z)
        scene.add(root);
    })
}
