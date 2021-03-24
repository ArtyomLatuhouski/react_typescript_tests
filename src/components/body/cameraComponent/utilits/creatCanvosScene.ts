import * as THREE from "three";


export function camera(fov: number, aspect: number, near: number, width?: number | undefined, height?: number | undefined): any {

    let aspectValue: number | undefined = width && height ? width / height : undefined


    return new THREE.PerspectiveCamera(
        fov, // fov = field of view
        aspectValue,// width / height, // aspect ratio
        aspect, // near plane
        near // far plane
    );
}

export function sceneSetup(
    container: HTMLElement,
    width: number, height: number,
    setScene: ({}) => {},
    camera: THREE.PerspectiveCamera,
    setCamera: ({}) => {},
    setRenderer: ({}) => {}) {

    setScene(new THREE.Scene()) // создать и записать scene

    camera.position.z = 9;
    setCamera(camera)

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    setRenderer(renderer)
    // @ts-ignore
    container.current.appendChild(renderer.domElement)

};
