<script>
    import { slide } from "svelte/transition";

	export let messages;

	function getColor(type) {
		if (type === "info") return '#B2FFD6';
		if (type === "warning") return '#ffd966';
		if (type === "error") return '#FF8864';
		return 'white';
	}
</script>

{#if messages.length > 0}
	<div class="messages">
		{#each messages as message}
			<p style="color: {getColor(message.type._type)}" in:slide = {{duration: 200}} out:slide = {{duration: 200}}>{message.text}</p>
		{/each}
	</div>
{/if}

<style>
	.messages {
		position: absolute;
		bottom: -0.7%;
		left: 0.1%;
		background-color: #0703034f;
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
	.messages p {
		margin: 4px 0;
	}
</style>
