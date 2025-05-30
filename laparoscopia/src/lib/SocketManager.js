import { io } from "socket.io-client";

export class SocketManager {
	constructor(serverUrl) {
		this.socket = io(serverUrl);
		this._toolCallback = null;
		this._cameraCallback = null;
		this._messagesCallback = null;
		this._initListeners();
	}

	onTool(callback) {
		this._toolCallback = callback;
	}

	onCamera(callback) {
		this._cameraCallback = callback;
	}

	onMessages(callback) {
		this._messagesCallback = callback;
	}

	_initListeners() {
		this.socket.on("tool", (data) => {
			if (this._toolCallback) {
				this._toolCallback(data);
			}
		});

		this.socket.on("camera", (data) => {
			if (this._cameraCallback) {
				this._cameraCallback(data);
			}
		});

		this.socket.on("messages", (data) => {
			if (this._messagesCallback) {
				this._messagesCallback(data);
			}
		});
	}

	disconnect() {
		this.socket.disconnect();
	}
}
