declare global {
    interface Window {
        engine: any;
    }
}
import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import { readdirSync } from "fs"
import path from 'path'

class SceneHandler {
    private sceneList: string[] = [];
    scene: (BABYLON.Scene | undefined);
    engine: (BABYLON.Engine | undefined);
    canvas: (HTMLCanvasElement | undefined);
    constructor() {
        this.sceneList = [];
        this.engine;
        this.canvas;
        this.scene;

    }
    //Get the name of all files that have a scene that can be rendered
    loadScenes = async () => {
        this.sceneList = readdirSync(path.join(__dirname, "scenes")).filter(d => d.endsWith(".js"))
    }
    //Set the canvas for everything to be rendered on
    setCanvas = async (canvas: HTMLCanvasElement) => {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true);
    }
    //A deafault scene to fall back on if an attempt load a scene fails
    private defaultScene = () => {
        let scene = new BABYLON.Scene(this.engine!)
        scene.debugLayer.show()

        let camera = new BABYLON.FreeCamera("Camera1", new BABYLON.Vector3(0, 10, -10), scene)
        camera.attachControl(true)
        camera.setTarget(BABYLON.Vector3.Zero())


        let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 4, -5), scene)

        let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene)

        let sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene)
        sphere.position.y = 1

        return scene
    }
    // Setting the new scene to render
    setScene = async (sceneName: string) => {
        this.loadScenes().then(() => {
            let i = 1
            for (let scene of this.sceneList) {
                let pulledScene = require(path.join(__dirname, `scenes/${scene}`))
                if (pulledScene.app.name === sceneName) {
                    this.scene != undefined ? (this.scene.dispose(), this.scene = pulledScene.app.scene(this.engine, this.canvas))
                        : this.scene = pulledScene.app.scene(this.engine, this.canvas)

                    break
                } else if (i === this.sceneList.length && this.scene === undefined) {
                    console.error(`Attempted to load none existing scene.
                "${sceneName}" does not belong to any scene name.
                Switching to default scene.`)
                    this.scene = this.defaultScene()
                }
                i++
            }
        })
    }
    // Start rendering of scene
    initialize() {
        this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

        this.engine?.runRenderLoop(() => {
            this.scene!.render();
        });
    }
}
let handler = new SceneHandler()
export default handler
window.addEventListener('DOMContentLoaded', function () {
    handler.setCanvas(document.getElementById('renderCanvas') as HTMLCanvasElement).then(() => {
        //Rename test to what ever you want the starting scene to be      
        handler.setScene("testScene").then(() => {
            handler.initialize()
        })

        window.addEventListener('resize', function () {
            handler.engine == null ? console.error("Cannot resize engine or null") : handler.engine.resize();
        });
    })
})

