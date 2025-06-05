import { CameraControllerData } from "./CameraControllerData";
export class CameraUIController {
    constructor(cameraDataInstance) {
        if (!(cameraDataInstance instanceof CameraControllerData)) {
            throw new Error('Se requiere una instancia de ToolData');
        }

        this.camera = cameraDataInstance;
        this.visible = true;
    }

    hideCamera(){
        this.visible = false;
    }

    showCamera(){
        this.visible = true;
    }
    getCamera() {
        return this.camera;
    }
}
