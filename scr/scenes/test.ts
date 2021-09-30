import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"

export let app ={ 
    name:"testScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.FreeCamera("Camera1",new BABYLON.Vector3(0,10,-10),scene)
    camera.attachControl(true)
    camera.setTarget(BABYLON.Vector3.Zero())
    let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
    
    let ground = BABYLON.Mesh.CreateGround("ground1",6,6,2,scene)
    
    let sphere = BABYLON.Mesh.CreateSphere("sphere",16,2,scene)
    sphere.position.y = 1
    
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
        alert("Scene loaded Correctly!!");
    });
    advancedTexture.addControl(button1);    
    return scene
    }}