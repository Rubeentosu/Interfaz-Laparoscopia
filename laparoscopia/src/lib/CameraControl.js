import { writable } from "svelte/store";

export let cameraHidden = writable(false);

export class CameraControl {
	constructor(cameraDepth) {
		this._cameraDepth = cameraDepth;
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
	static hide() {
		cameraHidden.set(true);
	}
	static show() {
		cameraHidden.set(false);
	}
}

