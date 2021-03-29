import * as THREE from "three";
import {Texture} from "three/src/textures/Texture";
import {FogBase} from "three/src/scenes/Fog";
import {Material} from "three/src/materials/Material";


export function creatScene(background: THREE.Color | THREE.Texture | THREE.WebGLCubeRenderTarget | null =null ,
                           fog?: FogBase | null ,
                           overrideMaterial?: Material | null  ,
                           autoUpdate?: boolean ,
                           environment?: null | Texture
) {
    // creat scene object
    const scene = new THREE.Scene()

    // add effect and settings in scene object

    if (background) scene.background = background
    if (fog) scene.fog = fog
    if (overrideMaterial) scene.overrideMaterial = overrideMaterial
    if (autoUpdate) scene.autoUpdate = autoUpdate
    if (environment) scene.environment = environment

    return scene

}
