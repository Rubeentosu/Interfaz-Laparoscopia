export class CameraControlClass {
	constructor(cameraDepth) {
		this._cameraDepth = cameraDepth;
	}
	get cameraDepth() {
		return this._cameraDepth;
	}
	set cameraDepth(value) {
		this._cameraDepth = value;
	}
}
