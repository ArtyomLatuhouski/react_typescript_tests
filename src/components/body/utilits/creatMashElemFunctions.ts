import * as THREE from 'three';


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
