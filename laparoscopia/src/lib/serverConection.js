import { io } from "socket.io-client";
import { writable } from "svelte/store";
import { ToolClass } from './ToolClass.js';
import { ConsoleMessage } from './ConsoleMessage.js';
import { MessageType } from "./ConsoleMessage.js";
import { CameraControlClass } from "./CameraControlClass.js";

export const socket = io("http://localhost:3000");

export const cameraControl = writable(new CameraControlClass (0));	
export const message = writable([]);

export const tools = writable([
	new ToolClass (0,0),
	new ToolClass (0,0),
	new ToolClass (0,0),
	new ToolClass (0,0)
]);

socket.on("tool", (data) => {
	if (data.length <= 4) {
		const updatedTools = [];
		for (let i = 0; i < data.length; i++) {
			const { depth, angle } = data[i];
			const tool = new ToolClass(depth, angle/2);
			updatedTools.push(tool);
		}
	
		tools.set(updatedTools);
	}else{
		const updatedTools = [];
		for (let i = 0; i < 4; i++) {
			const { depth, angle } = data[i];
			const tool = new ToolClass(depth, angle/2);
			updatedTools.push(tool);
		}
	
		tools.set(updatedTools);
	}
	
});

socket.on("camera", (data) => {
	cameraControl.set(new CameraControlClass(data));
});

socket.on("message", (data) => {
	const { msg, type } = data[0]; 

	let messageTypeInstance;
	switch(type) {
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
			console.warn("Tipo de mensaje desconocido:", type);
			messageTypeInstance = MessageType.info; 
	}

	const newMessage = new ConsoleMessage(msg, messageTypeInstance);

	message.update(currentMessages => {
		currentMessages.push(newMessage);
		
		if (currentMessages.length > 3) {
			currentMessages.shift();
		}
		
		return currentMessages;
	});

	setTimeout(() => {
		message.update(currentMessages => {
			const index = currentMessages.indexOf(newMessage);
			if (index !== -1) {
				currentMessages.splice(index, 1);
			}
			return currentMessages;
		});
	}, 5000);
});



