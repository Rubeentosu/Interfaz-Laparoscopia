<script>
	export let message; 

	$: messageText = message.text;
	$: messageType = message.type._type;

	$: textColor =
		messageType === "info" ? '#B2FFD6' : messageType === "warning" ? '#ffd966' : messageType === "error" ? '#FF8864' : 'white';
</script>

{#if messageText}
	<div class="messages" style="--text-color: {textColor};">
		<h3>{messageText}</h3>
	</div>
{/if}

<style>
	.messages {
		float: left;
		background-color: #070303b4;
		border: 2px solid #09060a;
		padding: 4px 12px;
		color: var(--text-color);
		height: auto;
		border-radius: 20px;
		max-width: 98%;
		overflow-wrap: break-word;
		word-wrap: break-word;
	}
	.messages h3 {
		margin: 0;
	}
</style>
