<script>
    import { slide } from "svelte/transition";
	import { ConsoleMessageUIController } from "../lib/ConsoleMessageUIController";
	export let messages;

</script>

{#if messages.length > 0}
	<div class="containerMessage">
		{#each messages as message}
			<p style="color: {ConsoleMessageUIController.changeColor(message.type._type)}" in:slide = {{duration: 200}} out:slide = {{duration: 200}}>{message.text}</p>
		{/each}
	</div>
{/if}

<style>
	.containerMessage {
		position: absolute;
		bottom: -0.3%;
		left: 0.3%;
		background-color: #07030342;
		border: 2px solid #09060a;
		padding: 10px 14px;
		border-radius: 20px;
		max-width: 40%;
		max-height: 20%;
		margin: 10px 0;
		overflow-wrap: break-word;
		word-wrap: break-word;
        user-select: none;
		overflow: hidden;
	}
	.containerMessage p {
		margin: 4px 0;
	}
</style>
