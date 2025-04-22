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
		{ depth: 60, points: "0,0 -25,-30 25,-30", ln_left: "rotate(-20)", ln_right: "rotate(20)" },
		{ depth: 70, points: "0,0 -20,-30 20,-30", ln_left: "rotate(-30)", ln_right: "rotate(30)" },
		{ depth: 55, points: "0,0 -15,-25 15,-25", ln_left: "rotate(-25)", ln_right: "rotate(25)" },
		{ depth: 65, points: "0,0 -22,-28 22,-28", ln_left: "rotate(-22)", ln_right: "rotate(22)" }
	];

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
		pointsArray.push(data.points);
		lnLeftArray.push(data.ln_left);
		lnRightArray.push(data.ln_right);
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

<InstrumentPosition on:addInstrument={handleAddInstrument} maxInstruments={2} />
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
