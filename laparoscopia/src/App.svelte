<script>
	import Camera from "./components/Camera.svelte";
	import Message from "./components/Message.svelte";
	import Instruments from "./components/Instruments.svelte";
	import CameraControls from "./components/CameraControls.svelte";

	let numInstruments = 3;

	const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];

	let depths = Array(numInstruments).fill(0);
	let pointsArray = Array(numInstruments).fill("0,0 -20,-30 20,-30");
	let lnLeftArray = Array(numInstruments).fill("rotate(-30)");
	let lnRightArray = Array(numInstruments).fill("rotate(30)");

    lnLeftArray[1] = "rotate(-45)";
    lnRightArray[1] = "rotate(45)";
    pointsArray[1] = "0,0 -35,-30 35,-30";

    function prueba() {
        let posicion = parseInt(prompt("Posicion"));
        return positions[posicion];
    }
</script>
<style>
    :global(body){
        overflow: hidden;
    }
</style>
<CameraControls />
<Message />

{#each Array(numInstruments) as _, i}
	<Instruments
		position={prueba()}
		number={i + 1}
		bind:depth={depths[i]}
		points={pointsArray[i]}
		ln_left={lnLeftArray[i]}
		ln_right={lnRightArray[i]}
	/>
{/each}

<Camera />