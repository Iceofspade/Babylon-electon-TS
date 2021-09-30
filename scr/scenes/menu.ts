import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import {IO} from "../serve"
import sceneHander from "../renderer"
export let app ={ 
    name:"menuScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.FreeCamera("Camera1",new BABYLON.Vector3(0,10,-10),scene)
    camera.attachControl(true)
    camera.setTarget(BABYLON.Vector3.Zero())
    let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
    let ground = BABYLON.Mesh.CreateGround("ground1",30,30,2,scene)
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

let but = new GUI.Button("bb")
but.widthInPixels = 200
but.heightInPixels = 100
but.background = "green"
advancedTexture.addControl(but)
let text = new GUI.TextBlock(" text","Connect...")
    text.color = "white";
but.addControl(text)
but.onPointerDownObservable.add(()=>{
    IO.connect()

    sceneHander.setScene("testScene")
})

    return scene
    }}