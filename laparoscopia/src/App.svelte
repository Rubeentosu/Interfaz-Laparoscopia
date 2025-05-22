<script>
	import Camera from "./components/Camera.svelte";
	import MessageContainer from "./components/MessageContainer.svelte";
	import Tool from "./components/Tool.svelte";
	import CameraControlsComponent from "./components/CameraControl.svelte";
	import { ConsoleMessageUIController } from "./lib/ConsoleMessageUIController";
	import {
    	cameraControl,
		message,
		tools,
	} from "./lib/ServerConection.js";
	import { toolHide, positions } from "./lib/ToolUIController";

</script>

<MessageContainer messages={$message} />
<Camera></Camera>
<CameraControlsComponent
	cameraDepth={$cameraControl.cameraDepth}
	cameraMessageColor={ConsoleMessageUIController.changeColor(ConsoleMessageUIController.getHighestPriorityMessageType($message, $cameraControl._cameraPosition)?._type || "")} />

{#each $tools as tool, i}
	<Tool
		toolHidden={toolHide[i]}
		toolDepth={tool.toolDepth}
		toolAngle={tool.toolOpening}
		toolLineLeft={`rotate(-${tool.toolAngle})`}
		toolLineRight={`rotate(${tool.toolAngle})`}
		toolNumber={tool.toolPosition}
		toolPosition={positions[tool.toolPosition - 1]}
		toolMessageColor={ConsoleMessageUIController.changeColor(ConsoleMessageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?._type || "")} />
{/each}