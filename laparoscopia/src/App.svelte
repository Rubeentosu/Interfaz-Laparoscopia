<script>
	import Camera from "./components/Camera.svelte";
	import Message from "./components/Message.svelte";
	import Tool from "./components/Tool.svelte";
	import CameraControlsComponent from "./components/CameraControlComponent.svelte";
	import { CameraControlClass } from "./lib/CameraControlClass.js";
	import {
		cameraDepth,
		message,
		tools,
	} from "./lib/serverConection.js";

	let cameraControl = new CameraControlClass($cameraDepth);
	const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];
</script>

<CameraControlsComponent bind:cameraDepth={$cameraDepth} control={cameraControl} />
{#each $tools as tool, i}
	<Tool
		toolDepth={tool.toolDepth}
		toolAngle={tool.points()}
		toolLineLeft={`rotate(-${tool.toolAngle})`}
		toolLineRight={`rotate(${tool.toolAngle})`}
		toolNumber={i + 1}
		toolPosition={positions[i]}
	/>
{/each}



