import { io } from "socket.io-client";
import { writable } from "svelte/store";
import { ToolData } from './ToolData.js';
import { ConsoleMessage } from './ConsoleMessage.js';
import { MessageType } from "./ConsoleMessage.js";
import { CameraControl } from "./CameraControl.js";

export const socket = io("http://localhost:3000");

export const cameraControl = writable(new CameraControl (0));	
export const message = writable([]);

export const tools = writable([]);



socket.on("tool", (data) => {
	if (data.length <= 4) {
		const updatedTools = [];
		for (let i = 0; i < data.length; i++) {
			const { depth, angle, position } = data[i];
			const tool = new ToolData(depth, angle/2, position);
			updatedTools.push(tool);
		}
		
		tools.set(updatedTools);
	}else{
		const updatedTools = [];
		for (let i = 0; i < 4; i++) {
			const { depth, angle, position } = data[i];
			const tool = new ToolData(depth, angle/2, position);
			updatedTools.push(tool);
		}
		tools.set(updatedTools);
	}
	
});

socket.on("camera", (data) => {
	cameraControl.set(new CameraControl(data));
});

socket.on("message", (data) => {
	const parsedMessages = [];

	for (const item of data) {
		let messageTypeInstance;
		switch (item.type) {
			case "info":
				messageTypeInstance = MessageType.info;
				break;
			case "warning":
				messageTypeInstance = MessageType.warning;
				break;
			case "error":
				messageTypeInstance = MessageType.error;
				break;
			default:
				console.warn("Unknown Message Type:", item.type);
				messageTypeInstance = MessageType.info;
		}
		const newMessage = new ConsoleMessage(item.msg, messageTypeInstance, item.position);
		parsedMessages.push(newMessage);
	}

	message.set(parsedMessages); // ← conservar todos los mensajes
});



