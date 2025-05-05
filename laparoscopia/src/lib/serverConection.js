import { io } from "socket.io-client";
import { writable } from "svelte/store";
import { ToolClass } from './ToolClass.js';

export const socket = io("http://localhost:3000");

export const cameraDepth = writable(0);	
export let message;

export const tools = writable([
	new ToolClass(0, 0),
	new ToolClass(0, 0),
	new ToolClass(0, 0),
	new ToolClass(0, 0)
]);

socket.on("instrument", (data) => {
	const updatedTools = [];

	for (let i = 0; i < data.length; i++) {
		const { depth, angle } = data[i];
		const tool = new ToolClass(depth, angle/2);
		updatedTools.push(tool);
	}

	tools.set(updatedTools);
});


socket.on("camera", (data) => {
	cameraDepth.set(data);
});

socket.on("msg", (data) => {
	message = data;
});
