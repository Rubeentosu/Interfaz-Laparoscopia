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
	import { toolHide, ToolUIController, positions } from "./lib/ToolUIController";

</script>

{#if $message.length > 0}
	<MessageContainer messages={$message} />

	<CameraControlsComponent
		cameraDepth={$cameraControl.cameraDepth}
		cameraMessageColor={ConsoleMessageUIController.changeColor(
			ConsoleMessageUIController.getHighestPriorityMessageType($message, $cameraControl._position)?._type || ""
		)} />

	{#each $tools as tool, i}
		<Tool
			toolHidden={toolHide[i]}
			toolDepth={tool.toolDepth}
			toolAngle={tool.points()}
			toolLineLeft={`rotate(-${tool.toolAngle})`}
			toolLineRight={`rotate(${tool.toolAngle})`}
			toolNumber={tool.toolPosition}
			toolPosition={positions[tool.toolPosition - 1]}
			toolMessageColor={ConsoleMessageUIController.changeColor(
				ConsoleMessageUIController.getHighestPriorityMessageType($message, tool.toolPosition)?._type || ""
			)} />
	{/each}
{:else}
	<CameraControlsComponent
		cameraDepth={$cameraControl.cameraDepth}
		cameraMessageColor={ConsoleMessageUIController.changeColor("")} />

	{#each $tools as tool, i}
		<Tool
			toolHidden={toolHide[i]}
			toolDepth={tool.toolDepth}
			toolAngle={tool.points()}
			toolLineLeft={`rotate(-${tool.toolAngle})`}
			toolLineRight={`rotate(${tool.toolAngle})`}
			toolNumber={tool.toolPosition}
			toolPosition={positions[tool.toolPosition - 1]}
			toolMessageColor={ConsoleMessageUIController.changeColor("")} />
	{/each}
{/if}
