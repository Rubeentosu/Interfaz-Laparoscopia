export class CameraControllerData {
	constructor(cameraDepth) {
		if (cameraDepth < 0 || cameraDepth > 15) {
			throw new Error("The Camera Depth must be a number between 0 and 15");
		}else{
			this._cameraDepth = cameraDepth;
		}
		this._cameraPosition = 0;
	}
	get cameraDepth() {
		return this._cameraDepth;
	}
	set cameraDepth(value) {
		this._cameraDepth = value;
	}
	get position(){
		return this._cameraPosition;
	}
}

