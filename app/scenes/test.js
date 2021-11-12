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
exports.app = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
exports.app = {
    name: "testScene",
    scene: (engine, canvas) => {
        let scene = new BABYLON.Scene(engine);
        scene.debugLayer.show();
        let camera = new BABYLON.FreeCamera("Camera1", new BABYLON.Vector3(0, 10, -10), scene);
        camera.attachControl(true);
        camera.setTarget(BABYLON.Vector3.Zero());
        let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 4, -5), scene);
        let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
        let sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene);
        sphere.position.y = 1;
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", false, scene);
        var button1 = GUI.Button.CreateSimpleButton("but1", "Click Me");
        button1.width = "150px";
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "green";
        button1.onPointerUpObservable.add(function () {
            alert("Scene loaded Correctly!!");
        });
        advancedTexture.addControl(button1);
        return scene;
    }
};
