<script>
	import { createEventDispatcher } from "svelte";

	export let maxInstruments = 4;

	const dispatch = createEventDispatcher();
	const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];

	let usados = [false, false, false, false];
	let contador = 0;

	function addInstrument(i) {
		if (contador >= maxInstruments) return;

		dispatch("addInstrument", { position: positions[i] });
		usados[i] = true;
		contador += 1;
	}
</script>

{#each positions as position, i}
	{#if !usados[i] && contador < maxInstruments}
		<div class="vertical {position}">
			<button on:click={() => addInstrument(i)}>Añadir instrumento</button>
		</div>
	{/if}
{/each}

<style>
	.vertical {
		padding: 15px;
		transform: rotate(-270deg);
		border-radius: 15px;
		background-color: black;
		width: 270px;
		opacity: 80%;
		display: flex;
		align-items: center;
	}
	.top-right {
		position: absolute;
		top: 30%;
		right: -4%;
	}
	.top-left {
		position: absolute;
		top: 30%;
		left: -4%;
	}
	.bottom-left {
		position: absolute;
		top: 70%;
		left: -4%;
	}
	.bottom-right {
		position: absolute;
		top: 70%;
		right: -4%;
	}
	@media screen and (max-width: 1024px) {
		.vertical {
			width: 220px;
			height: 50px;
		}
	}
	@media screen and (min-width: 1440px) {
		.vertical {
			width: 250px;
			height: 50px;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1440px) {
		.vertical {
			width: 250px;
			height: 50px;
			padding: 12px;
		}
	}
</style>
