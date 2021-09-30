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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
const serve_1 = require("../serve");
const renderer_1 = __importDefault(require("../renderer"));
exports.app = {
    name: "menuScene",
    scene: (engine, canvas) => {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.FreeCamera("Camera1", new BABYLON.Vector3(0, 10, -10), scene);
        camera.attachControl(true);
        camera.setTarget(BABYLON.Vector3.Zero());
        let light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 4, -5), scene);
        let ground = BABYLON.Mesh.CreateGround("ground1", 30, 30, 2, scene);
        let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let but = new GUI.Button("bb");
        but.widthInPixels = 200;
        but.heightInPixels = 100;
        but.background = "green";
        advancedTexture.addControl(but);
        let text = new GUI.TextBlock(" text", "Connect...");
        text.color = "white";
        but.addControl(text);
        but.onPointerDownObservable.add(() => {
            serve_1.IO.connect();
            renderer_1.default.setScene("testScene");
        });
        return scene;
    }
};
