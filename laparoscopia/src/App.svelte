<script>
	import Camera from "./components/Camera.svelte";
	import Message from "./components/Message.svelte";
	import Instruments from "./components/Instruments.svelte";
	import CameraControls from "./components/CameraControls.svelte";
	import InstrumentPosition from "./components/InstrumentPosition.svelte";
	
</script>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>

<InstrumentPosition on:addInstrument={handleAddInstrument} maxInstruments={numInstrument} />
<CameraControls bind:zoom = {zoom}/>
<Message message = {msg}></Message>

{#each depths as depth, i}
	<Instruments
		position={positions[i]}
		number={i + 1}
		bind:depth={depths[i]}
		points={pointsArray[i]}
		ln_left={lnLeftArray[i]}
		ln_right={lnRightArray[i]}
	/>
{/each}

<Camera />
