<script>
	import { createEventDispatcher } from "svelte";

	export let maxInstruments;

	const dispatch = createEventDispatcher();
	const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];

	let used = [false, false, false, false];
	let counter = 0;

	function addInstrument(i) {
		if (counter >= maxInstruments) return;

		dispatch("addInstrument", { position: positions[i] });
		used[i] = true;
		counter += 1;
	}
</script>

{#each positions as position, i}
	{#if !used[i] && counter < maxInstruments}
	<div class="vertical {position}">
		<div class="button-center">
			<button on:click={() => addInstrument(i)} class="img-button">
				<img src="./src/resources/imgs/icons8-más.svg" alt="plus" class="clickable-img" />
			</button>
		</div>
	</div>
	{/if}
{/each}

<style>
	.button-center {
	display: flex;
	align-items: center;
	justify-content: center;
	}
	.vertical {
		margin: 0 80px;
        padding: 15px 15px 12px 15px;
        border-radius: 15px;
        background-color: black;
        opacity: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
	}
	.img-button {
		all: unset; 
		cursor: pointer;
	}
	.clickable-img {
		width: 40px;
		height: 40px;
		cursor: pointer;
		transition: transform 0.1s ease;
		background-color: black;
	}
	.clickable-img:active {
		transform: scale(0.9); 
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
			width: 30px;
			height: 30px;
			margin: 0 35px;
		}
	}
	@media screen and (min-width: 1440px) {
		.vertical {
			width: 30px;
			height: 30px;
			margin: 0 80px;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1440px) {
		.vertical {
			width: 30px;
			height: 30px;
			margin: 0 50px;
		}
	}
</style>
