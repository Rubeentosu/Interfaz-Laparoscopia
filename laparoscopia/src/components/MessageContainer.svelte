<script>
    import { slide } from "svelte/transition";
	import { ConsoleMessageUIController } from "../lib/ConsoleMessageUIController";
	export let messages;

</script>

{#if messages.length > 0}
	<div class="containerMessage">
		{#each messages as message}
		<div class="tooltip-linea" in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
			<p class="tooltip-parrafo" style="color: {ConsoleMessageUIController.changeColor(message.type._type)}">
			  {message.text}
			</p>
			<span class="tooltip-caja">{message.text}</span>
		  </div>
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
	.containerMessage p {
		margin: 4px 0;
		white-space: nowrap;        
		overflow: hidden;            
		text-overflow: ellipsis; 
	}
	.tooltip-parrafo {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
	cursor: default;
	}
	.tooltip-caja {
    display: none;
    position: absolute;
    background-color: #07030342;
	border: 2px solid #09060a;
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    max-width: 400px;       
    width: max-content;    
    top: 50%;
    left: 108%;            
    transform: translateY(-50%);
    white-space: normal;
    z-index: 100;
    font-size: 0.85rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    word-wrap: break-word;  
}
	.tooltip-parrafo:hover + .tooltip-caja,
	.tooltip-caja:hover {
		display: block;
	}
	@media (max-height: 900px) {
		.containerMessage {
			height: 13%;
		}
	
	.containerMessage p {
		margin: 1px 0;
	}
	}
	
</style>
