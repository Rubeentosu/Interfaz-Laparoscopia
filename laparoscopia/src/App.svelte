<script>
	import Camera from "./components/CameraVisualInterface.svelte";
	import MessageContainer from "./components/MessagesContainerControl/MessageContainer.svelte";
	import Tool from "./components/ToolControl/ToolDisplay.svelte";
	import { CameraControllerData } from "./components/CameraControl/CameraControllerData";
	import { ConsoleMessageUIController } from "./components/MessagesContainerControl/MessageContentControl/ConsoleMessageUIController";
	import { ToolUIController } from "./components/ToolControl/ToolUIController"; 
    import { writable } from "svelte/store";
    import { ToolData } from "./components/ToolControl/ToolData";
    import { SocketManager } from "./lib/SocketManager";
    import { ConsoleMessageData, MessageType } from "./components/MessagesContainerControl/MessageContentControl/ConsoleMessageData";
    import CameraControlDisplay from "./components/CameraControl/CameraControlDisplay.svelte";
    import { CameraUIController } from "./components/CameraControl/CameraUIController";

	// AQUI

	const cameraControl = writable(new CameraControllerData(10));
    const tools = writable([
	    new ToolData(0, 0, 1),    
	    new ToolData(0, 0, 2),
	    new ToolData(0, 0, 3),
	    new ToolData(0, 0, 4),
    ]);
    const message = writable([]);

    const socketManager = new SocketManager("http://localhost:3000");
    
	socketManager.onTool((data) => {
		let numero;
		if (data.length <= 4) {
			numero = data.length;
		}else{
			numero = 4;
		}
		const updatedTools = [];
		for (let i = 0; i < numero; i++) {
			const { depth, angle, position } = data[i];
			const tool = new ToolData(depth, angle/2, position);
				tool.addTool(updatedTools);
			
		}
		tools.set(updatedTools);
	});

	socketManager.onCamera((data) => {
		cameraControl.set(new CameraControllerData(data));
	});
	const emptyMessageData = new ConsoleMessageData("", MessageType.info, null);
	const messageUIController = new ConsoleMessageUIController(emptyMessageData);

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

		if (messageTypeInstance === MessageType.error) {
			item.message = "❌ " + item.message;
		} else if (messageTypeInstance === MessageType.warning) {
			item.message = "⚠️ " + item.message;
		} else {
			item.message = "ℹ️ " + item.message;
		}

		const messageData = new ConsoleMessageData(item.message, messageTypeInstance, item.toolPosition);
		const messageInstance = new ConsoleMessageUIController(messageData); 

		messageInstance.addMessage(updatedMessages);
	}

	message.set(updatedMessages.slice(0, 5)); 
});	
</script>

<MessageContainer messages = {$message} />
<Camera></Camera>
<CameraControlDisplay
	cameraController = {new CameraUIController($cameraControl)}
	cameraMessageColor={messageUIController.changeColor(messageUIController.getHighestPriorityMessageType($message, $cameraControl.position)?.type || "")} />

{#each $tools as tool}
	<Tool
		toolController = {new ToolUIController(tool)}
		toolNumber={(messageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?.type || "") === "error" ? '⨉' : tool.toolPosition}
		toolMessageColor={messageUIController.changeColor(messageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?.type || "")} />
{/each}
