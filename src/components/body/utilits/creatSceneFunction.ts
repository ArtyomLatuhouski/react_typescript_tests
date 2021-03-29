import THREE from "three";
import {Texture} from "three/src/textures/Texture";
import {FogBase} from "three/src/scenes/Fog";
import {Material} from "three/src/materials/Material";


// export class creatScene {
//
//     private background: Color | Texture | WebGLCubeRenderTarget | null | undefined;
//     private fog?: FogBase | null
//     private overrideMaterial?: Material | null
//     private utoUpdate?: boolean
//     private environment?: null | Texture
//
//     constructor(background?: null | Color | Texture | WebGLCubeRenderTarget,
//                 fog?: FogBase | null,
//                 overrideMaterial?: Material | null,
//                 utoUpdate?: boolean,
//                 environment?: null | Texture) {
//
//         this.background = background
//         this.fog = fog
//         this.overrideMaterial = overrideMaterial
//         this.utoUpdate = utoUpdate
//         this.environment = environment
//     }
//
//
// }

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
