import * as THREE from 'three';


export class ElementCreator {
    private elementConstruct:()=>{};


    constructor(elementConstruct:()=>{}) {
        this.elementConstruct = elementConstruct;
    }
}

export class SettingsCreator {

    private element: THREE.Mesh | THREE.Mesh[];
    private scene: THREE.Scene;
    private canvas: HTMLCanvasElement;
    private init: () => void;

    constructor(element: THREE.Mesh, scene: THREE.Scene, canvas: HTMLCanvasElement) {
        this.element = element
        this.scene = scene
        this.canvas = canvas

        this.init = () => {
            //добавляем элементы в сцену
            if ( element instanceof Array ) element.forEach(item=>scene.add(item))
            else scene.add(element)

            let renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas:canvas});
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            canvas.appendChild(renderer.domElement);
        }
    }

}
