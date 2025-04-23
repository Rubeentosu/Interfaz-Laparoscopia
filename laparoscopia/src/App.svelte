<script>
	import Camera from "./components/Camera.svelte";
	import Message from "./components/Message.svelte";
	import Instruments from "./components/Instruments.svelte";
	import CameraControls from "./components/CameraControls.svelte";
	import InstrumentPosition from "./components/InstrumentPosition.svelte";

	let depths = [];
	let pointsArray = [];
	let lnLeftArray = [];
	let lnRightArray = [];
	let positions = [];

	// 🔹 Datos simulados como si vinieran del servidor
	const ServerData = [
		{ depth: 11, ln_left: 40, ln_right: 40 },
		{ depth: 12, ln_left: 20, ln_right: 20 },
		{ depth: 4, ln_left: 10, ln_right: 10 },
		{ depth: 14, ln_left: 32, ln_right: 32 }
	];

	function points(angle) {
		
		let fill = 0;
		let position = "";

		if(angle <= 14){
			fill = 3;
			position = String(fill);
		}else{
			fill = angle - 10;
			position = String(fill);
		}
		let result = `0,0 -${position},-30 ${position},-30`;
		return result;
	}
	// 🔸 Devuelve los datos inmediatamente, sin retraso
	function getInstrumentData(index) {
		return ServerData[index];
	}

	function handleAddInstrument(event) {
		const position = event.detail.position;
		const index = depths.length;

		if (index >= ServerData.length) return;

		const data = getInstrumentData(index);

		// Usamos push para añadir los datos a los arrays
		depths.push(data.depth);
		pointsArray.push(points(data.ln_right));
		lnLeftArray.push(`rotate(-${data.ln_left})`);
		lnRightArray.push(`rotate(${data.ln_right})`);
		positions.push(position);

		// Forzamos la reactividad
		depths = depths;
		pointsArray = pointsArray;
		lnLeftArray = lnLeftArray;
		lnRightArray = lnRightArray;
		positions = positions;
	}
</script>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>

<InstrumentPosition on:addInstrument={handleAddInstrument} maxInstruments={4} />
<CameraControls />
<Message />

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
