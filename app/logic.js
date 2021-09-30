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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityControle = exports.Unit = void 0;
const BABYLON = __importStar(require("babylonjs"));
const GUI = __importStar(require("babylonjs-gui"));
class Unit {
    constructor(_ID, _name, gui, _scene, pos) {
        this.deleteSelf = () => {
            this.mesh.dispose();
            this.ID = null;
            this.name = null;
        };
        this.getID = () => {
            return this.ID;
        };
        this.setPos = (pos) => {
            this.mesh.position = pos;
        };
        this.moveLeft = () => __awaiter(this, void 0, void 0, function* () {
            this.mesh.position.x += 2;
        });
        this.moveRight = () => __awaiter(this, void 0, void 0, function* () {
            this.mesh.position.x -= 2;
        });
        this.moveUp = () => __awaiter(this, void 0, void 0, function* () {
            this.mesh.position.z += 2;
        });
        this.moveDown = () => __awaiter(this, void 0, void 0, function* () {
            this.mesh.position.z -= 2;
        });
        this.scene = _scene;
        this.ID = _ID;
        this.name = _name;
        this.mesh = BABYLON.Mesh.CreateBox(this.name + " box", 1, this.scene);
        pos != undefined ? this.mesh.position = pos : pos;
        let shade = new BABYLON.StandardMaterial("mat", this.scene);
        shade.diffuseColor = new BABYLON.Color3(0, 0, 1);
        shade.emissiveColor = new BABYLON.Color3(0, 0, 1);
        this.mesh.material = shade;
        let nametag = new GUI.Rectangle(this.name);
        nametag.width = "60px";
        nametag.height = "20px";
        nametag.color = "white";
        nametag.cornerRadius = 20;
        nametag.background = "green";
        gui.addControl(nametag);
        nametag.linkOffsetYInPixels = -20;
        nametag.linkWithMesh(this.mesh);
        let text = new GUI.TextBlock(this.name + " text", this.name);
        text.color = "white";
        nametag.addControl(text);
        this.scene.onKeyboardObservable.add((kbinfo) => {
            switch (kbinfo.type) {
                case BABYLON.KeyboardEventTypes.KEYUP:
                    switch (kbinfo.event.key) {
                        case "a":
                        case "A":
                            this.moveRight().then(() => {
                            });
                            console.log("Brave!!");
                            break;
                        case "w":
                        case "W":
                            this.moveUp().then(() => {
                            });
                            break;
                        case "s":
                        case "S":
                            this.moveDown().then(() => {
                            });
                            break;
                        case "d":
                        case "D":
                            this.moveLeft().then(() => {
                            });
                            break;
                    }
                    break;
            }
        });
    }
}
exports.Unit = Unit;
class EntityControle {
    constructor() {
        this.entityList = [];
        this.addEntity = (entity) => {
            this.entityList.push(entity);
        };
        this.removeEntity = (entity) => {
            let deleted = this.entityList.splice(this.entityList.indexOf(entity), 1);
            deleted[0].deleteSelf();
        };
        this.getEntity = (ID) => {
            return this.entityList.filter(entity => entity.getID() === ID)[0];
        };
        this.updatePostion = (entity, pos) => {
            entity.mesh.position = pos;
        };
        this.getEntityList = () => {
            return this.entityList;
        };
    }
}
exports.EntityControle = EntityControle;
