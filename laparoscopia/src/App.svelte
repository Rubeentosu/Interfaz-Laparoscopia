<script>
	import Camera from "./components/Camera.svelte";
	import Message from "./components/Message.svelte";
	import Instruments from "./components/Instruments.svelte";
	import CameraControls from "./components/CameraControls.svelte";
	import InstrumentsPosition from "./components/InstrumentPosition.svelte"
    import InstrumentPosition from "./components/InstrumentPosition.svelte";

	let numInstruments = 2;

	const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];

	let depths = Array(numInstruments).fill(50);
	let pointsArray = Array(numInstruments).fill("0,0 -20,-30 20,-30");
	let lnLeftArray = Array(numInstruments).fill("rotate(-30)");
	let lnRightArray = Array(numInstruments).fill("rotate(30)");

	
    lnLeftArray[1] = "rotate(-25)";
    lnRightArray[1] = "rotate(25)";
    pointsArray[1] = "0,0 -15,-30 15,-30";

    function test() {
        let position = parseInt(prompt("Posicion"));
		if(position < 0 || position > 3 || isNaN(position)){
			return test();
		}else{
			return positions[position];
		}
    }
</script>
<style>
    :global(body){
        overflow: hidden;
    }
</style>
<InstrumentPosition></InstrumentPosition>
<CameraControls />
<Message />

{#each Array(numInstruments) as _, i}
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