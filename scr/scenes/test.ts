import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import {Unit,EntityControle} from "../logic"
import {IO} from "../serve"
import * as TYPEINGS from "../typeings"
import { emit } from "process"
import { BADQUERY } from "dns"




export  const EC = new EntityControle()
export let app ={ 
    name:"testScene",
    scene: (engine:BABYLON.Engine,canvas:HTMLCanvasElement)=>{
    let scene = new  BABYLON.Scene(engine)
    let camera = new BABYLON.FreeCamera("Camera1",new BABYLON.Vector3(0,10,-10),scene)
    camera.attachControl(true)
    camera.setTarget(BABYLON.Vector3.Zero())
    let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,4,-5),scene) 
    let ground = BABYLON.Mesh.CreateGround("ground1",30,30,2,scene)
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //event logging
    let names = ["shino","spade","salty","ditto","Dark"]
    let player = new Unit(`${Math.random()}`,names[Math.round(Math.random()*(names.length-1))],advancedTexture,scene)
    EC.addEntity(player)

    
let but = new GUI.Button("bb")
but.widthInPixels = 30
but.heightInPixels = 30
but.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
but.background = "red"
advancedTexture.addControl(but)

but.onPointerDownObservable.add(()=>{
// console.log(EC.getEntity(player.getID() as string))
// console.log(player.getID() === EC.getEntityList()[0].getID())
console.log(EC.getEntityList(),"Meow")

IO.emit("middle","Meow")
IO.emit("Moved",{name:player.name,ID:player.getID(),pos:player.mesh.position})

})

// Let the server know this client has joined
    IO.emit("newconnection",{name:player.name,ID:player.getID(),pos:BABYLON.Vector3.Zero()})

// Adds the other client that has connected to the server to this clients view
    IO.on("newconnection",(data:TYPEINGS.User)=>{
        let newPlayer = new Unit(data.ID,data.name,advancedTexture,scene,data.pos)
        EC.addEntity(newPlayer)
        console.log("Sent player DATA!!")
        

        IO.emit("updateClients",{name:player.name,ID:player.getID(),pos:player.mesh.position})
    })

    // Updates all other clients of the position of other clients
    IO.on("updateClients",(data:TYPEINGS.User)=>{
        console.log(data.name+" has connected!!")
        let currentPlayer = new Unit(data.ID,data.name,advancedTexture,scene,data.pos)
        EC.addEntity(currentPlayer)
    })

// movement only works on one Client and any attempts to move on the other will break both. 
// causing both clients to no longer be able to move.
// It's emit event is in the player controles

    IO.on("Moved",(userData:TYPEINGS.User)=>{
        console.log(`${userData.name} has moved!`)
        EC.getEntity(userData.ID).setPos(userData.pos);
    });

    IO.on("Mover",()=>{
        IO.emit("Moved",{name:player.name,ID:player.getID(),pos:player.mesh.position})
    })
    
    return scene
    }}