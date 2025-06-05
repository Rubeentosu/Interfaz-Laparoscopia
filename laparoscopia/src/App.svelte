<script>
	import Camera from "./components/CameraVisualInterface.svelte";
	import MessageContainer from "./components/MessagesContainerControl/MessageContainer.svelte";
	import Tool from "./components/ToolControl/ToolDisplay.svelte";
	import { CameraUIController } from "./components/CameraControl/CameraUIController";
	import { ConsoleMessageUIController } from "./components/MessagesContainerControl/ConsoleMessageUIController";
	import { ToolUIController } from "./components/ToolControl/ToolUIController";
    import PrimaryButton from "./components/PrimaryButton/PrimaryButton.svelte";
    import { PrimaryButtonController } from "./components/PrimaryButton/PrimaryButtonController";
    import { writable } from "svelte/store";
    import { ToolData } from "./components/ToolControl/ToolData";
    import { SocketManager } from "./lib/SocketManager";
    import { ConsoleMessage, MessageType } from "./components/MessagesContainerControl/ConsoleMessage";
    import CameraControlInterface from "./components/CameraControl/CameraControlInterface.svelte";

	// AQUI

	const cameraControl = writable(new CameraUIController(10));
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
		cameraControl.set(new CameraUIController(data));
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
			if(messageTypeInstance === MessageType.error){
				item.message = "❌ " + item.message;
			}else if (messageTypeInstance === MessageType.warning) {
				item.message = "⚠️ " + item.message;
			} else {
				item.message = "ℹ️ " + item.message;
			}
			const newMessage = new ConsoleMessage(item.message, messageTypeInstance, item.toolPosition);
			newMessage.addMessage(updatedMessages);
		}

		message.set(updatedMessages.slice(0, 5)); 
		
	});
	let startButtonController = new PrimaryButtonController("Start",5);
	startButtonController.onClick = ()=>{console.log("Start")}
	let stopButtonController = new PrimaryButtonController("Stop", 50);
	stopButtonController.onClick = ()=>{console.log("Stop")}
</script>

<PrimaryButton controller = {startButtonController}/>
<PrimaryButton controller = {stopButtonController}/>

<MessageContainer messages={$message} />
<Camera></Camera>
<CameraControlInterface
	cameraDepth={$cameraControl.cameraDepth}
	cameraMessageColor={ConsoleMessageUIController.changeColor(ConsoleMessageUIController.getHighestPriorityMessageType($message, $cameraControl.position)?.type || "")} />

{#each $tools as tool, i}
	<Tool
		toolController = {new ToolUIController(tool)}
		toolNumber={(ConsoleMessageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?._type || "") === "error" ? '⨉' : tool.toolPosition}
		toolMessageColor={ConsoleMessageUIController.changeColor(ConsoleMessageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?.type || "")} />
{/each}
