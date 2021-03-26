import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export class World {
    constructor() {
// synchronous setup here
// create camera, renderer, scene, etc.
    }
    async init() {
// asynchronous setup here
// load bird models
        loadBirds()
    }
}


async function loadBirds() {
    const loader = new GLTFLoader();
    const parrotData = await loader.loadAsync('https://gltf-viewer.donmccurdy.com/');
    console.log('Squaaawk!', parrotData);
}



// @ts-ignore
//import model from '../../../../models/flycatcher.glb';
// let loader = new GLTFLoader();
// loader.load(model, function (geometry) {
//     console.log(model)
//     // if the model is loaded successfully, add it to your scene here
// }, undefined, function (err) {
//     console.error(err);
// });
