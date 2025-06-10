<script>
    import { slide } from "svelte/transition";
	import { ConsoleMessageUIController } from "./ConsoleMessageUIController";
    export let messageController;
    if(!(messageController instanceof ConsoleMessageUIController)){
        throw new Error("Controller of ToolDisplay must be a ToolUIController");
    }
</script>
    <div class="tooltip-linea" in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
        <p class="tooltip-parrafo" style="color: {messageController.changeColor(messageController.message.type.type)}">
            {messageController.message.text}
        </p>
        <span class="tooltip-caja" style="color: {messageController.changeColor(messageController.message.type.type)}">{messageController.message.text}</span>
    </div>
<style>
	p {
		margin: 2px 0;
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
	p {
		margin: -2px 0;
	}
	}
	
</style>
