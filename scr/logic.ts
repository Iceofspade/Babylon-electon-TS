import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"
import { Scene } from "babylonjs/scene"
import {IO} from "./serve"


export class Unit{
private ID: string|null
public name:string|null
public mesh:BABYLON.Mesh
public scene:BABYLON.Scene
constructor(_ID:string,_name:string,gui:GUI.AdvancedDynamicTexture,_scene:BABYLON.Scene,pos?:BABYLON.Vector3){
    this.scene = _scene
    this.ID =_ID
    this.name =_name
    this.mesh = BABYLON.Mesh.CreateBox(this.name+" box",1,this.scene)
    pos != undefined ? this.mesh.position = pos : pos
    
    let shade = new BABYLON.StandardMaterial("mat",this.scene)
    shade.diffuseColor = new BABYLON.Color3(0,0,1)
    shade.emissiveColor = new BABYLON.Color3(0,0,1)
    this.mesh.material = shade

    let nametag = new GUI.Rectangle(this.name);
    nametag.width = "60px"
    nametag.height = "20px";
    nametag.color = "white";
    nametag.cornerRadius = 20;
    nametag.background = "green";
    gui.addControl(nametag);  
    nametag.linkOffsetYInPixels = -20
    nametag.linkWithMesh(this.mesh) 
    let text = new GUI.TextBlock(this.name+" text",this.name)
    text.color = "white";
    nametag.addControl(text)

this.scene.onKeyboardObservable.add( (kbinfo)=>{
    switch (kbinfo.type) {
    case BABYLON.KeyboardEventTypes.KEYUP:
        switch (kbinfo.event.key) {
        case "a":
        case "A":
    this.moveRight().then(()=>{

    })
    console.log("Brave!!")
            break;
        case "w":
        case "W":
    this.moveUp().then(()=>{

    })
            break;
        case "s":
        case "S":
            this.moveDown().then(()=>{
        
            })
            break;
        case "d":
        case "D":
    this.moveLeft().then(()=>{

    })
            break;
        }

    
        break;
    }

    })
}

deleteSelf = ()=>{
    this.mesh.dispose()
    this.ID = null
    this.name = null
}
getID = ():string|null =>{
    return this.ID
}
setPos = (pos:BABYLON.Vector3) =>{
this.mesh.position = pos
}
moveLeft = async()=>{    
    this.mesh.position.x += 2
}
moveRight = async()=>{    
    this.mesh.position.x -= 2
}
moveUp = async()=>{
    this.mesh.position.z += 2
}
moveDown = async()=>{    
    this.mesh.position.z -= 2
}

}

export class EntityControle {
    private entityList:Unit[] = []
    constructor() {
        
    }
    addEntity = (entity:Unit)=>{
        this.entityList.push(entity)
    }
    removeEntity = (entity:Unit)=>{

       let deleted = this.entityList.splice(this.entityList.indexOf(entity),1)
       deleted[0].deleteSelf()
    }
    getEntity = (ID:string):Unit =>{
       return this.entityList.filter(entity =>  entity.getID() === ID)[0]
    }
    updatePostion = (entity:Unit,pos:BABYLON.Vector3)=>{
        entity.mesh.position = pos
    } 
    getEntityList = () =>{
        return this.entityList
    }
}