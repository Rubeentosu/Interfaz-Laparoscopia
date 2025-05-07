<script>
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
			<p style="color: {getColor(message.type._type)}">{message.text}</p>
		{/each}
	</div>
{/if}

<style>
	.messages {
		float: left;
		background-color: #070303b4;
		border: 2px solid #09060a;
		padding: 10px 14px;
		border-radius: 20px;
		max-width: 98%;
		margin: 10px 0;
		overflow-wrap: break-word;
		word-wrap: break-word;
	}
	.messages p {
		margin: 4px 0;
	}
</style>
