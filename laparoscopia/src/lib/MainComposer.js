import { writable } from "svelte/store";
import { ToolData } from './ToolData.js';
import { ConsoleMessage } from './ConsoleMessage.js';
import { MessageType } from './ConsoleMessage.js';
import { CameraControl } from './CameraControl.js';
import { SocketManager } from './SocketManager.js';

export const cameraControl = writable(new CameraControl(10));
export const tools = writable([
	new ToolData(0, 0, 1),
	new ToolData(0, 0, 2),
	new ToolData(0, 0, 3),
	new ToolData(0, 0, 4),
]);
export const message = writable([]);

const socketManager = new SocketManager("http://localhost:3000");
    
socketManager.onTool((data) => {
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

socketManager.onCamera((data) => {
	cameraControl.set(new CameraControl(data));
});

socketManager.onMessages((data) => {
	const updatedMessages = [];

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
				console.warn("Unknown message type:", item.type);
				messageTypeInstance = MessageType.info;
		}

		const newMessage = new ConsoleMessage(item.message, messageTypeInstance, item.toolPosition);
		newMessage.addMessage(updatedMessages);
	}

	message.set(updatedMessages.slice(0, 5)); 
	
});
