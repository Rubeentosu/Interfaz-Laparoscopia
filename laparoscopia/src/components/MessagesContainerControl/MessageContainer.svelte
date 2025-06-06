<script>
	import MessageContent from "./MessageContentControl/MessageContent.svelte";
	export let messages;
</script>

{#if messages.length > 0}
	<div class="containerMessage">
		{#each messages as message}
    		<MessageContent messageController={message} />
		{/each}
	</div>
{/if}

<style>
	.containerMessage {
		position: absolute;
		bottom: -0.2%;
		left: 0.4%;
		background-color: #07030342;
		border: 2px solid #09060a;
		padding: 10px 14px;
		border-radius: 20px;
		width: 15%;
		height: 12%;
		margin: 10px 0;
        user-select: none;
	}	
	@media (max-height: 900px) {
		.containerMessage {
			height: 13%;
		}
	}
</style>
