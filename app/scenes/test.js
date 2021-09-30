"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.EC = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
const logic_1 = require("../logic");
const serve_1 = require("../serve");
exports.EC = new logic_1.EntityControle();
exports.app = {
    name: "testScene",
    scene: (engine, canvas) => {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.FreeCamera("Camera1", new BABYLON.Vector3(0, 10, -10), scene);
        camera.attachControl(true);
        camera.setTarget(BABYLON.Vector3.Zero());
        let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 4, -5), scene);
        let ground = BABYLON.Mesh.CreateGround("ground1", 30, 30, 2, scene);
        let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        //event logging
        let names = ["shino", "spade", "salty", "ditto", "Dark"];
        let player = new logic_1.Unit(`${Math.random()}`, names[Math.round(Math.random() * (names.length - 1))], advancedTexture, scene);
        exports.EC.addEntity(player);
        let but = new GUI.Button("bb");
        but.widthInPixels = 30;
        but.heightInPixels = 30;
        but.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        but.background = "red";
        advancedTexture.addControl(but);
        but.onPointerDownObservable.add(() => {
            // console.log(EC.getEntity(player.getID() as string))
            // console.log(player.getID() === EC.getEntityList()[0].getID())
            console.log(exports.EC.getEntityList(), "Meow");
            serve_1.IO.emit("middle", "Meow");
            serve_1.IO.emit("Moved", { name: player.name, ID: player.getID(), pos: player.mesh.position });
        });
        // Let the server know this client has joined
        serve_1.IO.emit("newconnection", { name: player.name, ID: player.getID(), pos: BABYLON.Vector3.Zero() });
        // Adds the other client that has connected to the server to this clients view
        serve_1.IO.on("newconnection", (data) => {
            let newPlayer = new logic_1.Unit(data.ID, data.name, advancedTexture, scene, data.pos);
            exports.EC.addEntity(newPlayer);
            console.log("Sent player DATA!!");
            serve_1.IO.emit("updateClients", { name: player.name, ID: player.getID(), pos: player.mesh.position });
        });
        // Updates all other clients of the position of other clients
        serve_1.IO.on("updateClients", (data) => {
            console.log(data.name + " has connected!!");
            let currentPlayer = new logic_1.Unit(data.ID, data.name, advancedTexture, scene, data.pos);
            exports.EC.addEntity(currentPlayer);
        });
        // movement only works on one Client and any attempts to move on the other will break both. 
        // causing both clients to no longer be able to move.
        // It's emit event is in the player controles
        serve_1.IO.on("Moved", (userData) => {
            console.log(`${userData.name} has moved!`);
            exports.EC.getEntity(userData.ID).setPos(userData.pos);
        });
        serve_1.IO.on("Mover", () => {
            serve_1.IO.emit("Moved", { name: player.name, ID: player.getID(), pos: player.mesh.position });
        });
        return scene;
    }
};
