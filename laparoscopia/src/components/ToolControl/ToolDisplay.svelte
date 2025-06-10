<script>
    import { ToolUIController } from './ToolUIController';
    import { scale } from 'svelte/transition';
    export let toolMessageColor;
    export let toolNumber;
    export let toolController;
    if(!(toolController instanceof ToolUIController)){
        throw new Error("Controller of ToolDisplay must be a ToolUIController");
    }
    let isVisible = toolController.visible;
</script>

{#if !isVisible}
	<div class="vertical-expand {toolController.assignToolPosition(toolController.tool._toolPosition)}" style="border: {toolMessageColor} 3px solid;" transition:scale={{ duration: 500 }}>
        <div class="button-center">
            <button on:click={() => {toolController.showTool(); isVisible = toolController.visible; }} class="img-button">
                <img src="./src/resources/imgs/expand.svg" alt="expand" class="clickable-img" />
            </button>
        </div>
	</div>
{:else}
    <div class="vertical {toolController.assignToolPosition(toolController.tool._toolPosition)}" style="border: {toolMessageColor} 3px solid;" transition:scale={{ duration: 500 }}>
        <div class="button-center" style="width: 30px;">
		    <button type="button" class="hide-button img-button" on:click={() => {toolController.hideTool(); isVisible = toolController.visible; }}><img src="./src/resources/imgs/collapse.svg" style="width: 16px;" alt="collapse" class="clickable-img"/></button>
		</div>
        <svg width="200" height="200" viewBox="0 0 200 240" id="angle">
			<g id="forceps" transform="translate(100,100)">
				<polygon points={toolController.tool._toolOpening} fill=#ffd966 />
                <line x1="0" y1="0" x2="0" y2="-60" stroke="black" stroke-linecap="round" stroke-width="10" transform="rotate({toolController.tool._toolAngle})" />
				<line x1="0" y1="0" x2="0" y2="-60" stroke="black" stroke-linecap="round" stroke-width="10" transform="rotate(-{toolController.tool._toolAngle})" />
				<line id="arm1" x1="0" y1="0" x2="0" y2="-60" stroke="#61bbff" stroke-linecap="round" stroke-width="7" transform="rotate({toolController.tool._toolAngle})" />
				<line id="arm2" x1="0" y1="0" x2="0" y2="-60" stroke="#61bbff" stroke-linecap="round" stroke-width="7" transform="rotate(-{toolController.tool._toolAngle})" />             
			</g>
		</svg>
        <img src="./src/resources/imgs/minun.png" alt="expand" class="minus" />
        <input type="range" min="0" max="15" disabled bind:value={toolController.tool._toolDepth} id="depth" style="width: 100px;">
        <img src="./src/resources/imgs/plus.svg" alt="expand" class="plus" />
        <p class="number" style="background-color: {toolMessageColor};">{toolNumber}</p>
	</div> 
{/if}
<style>
    .minus{
        width: 18px;
        height: 18px;
        position: absolute;
        top: 37%;
        left: 50%;
        transform: translateX(-50%);
    }
    .plus{
        width: 18px;
        height: 18px;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
    }
    #angle{
        position: relative;
        bottom: 10px;
        left: 0px;
    }
    .vertical-expand {
        padding: 12px 12px 8px 12px;
        border-radius: 15px;
        background-color: #07030325;
        border: #09060a 2px solid;
        user-select: none;
        margin-top: 85px;
    }

    .vertical {
        padding: 15px;
        border-radius: 15px;
        background-color: #0703033a;
        height: 218px;
        width: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        user-select: none;
    }

    .button-center {
        display: flex;
        justify-content: center;
        background-color: transparent;
        width: 100%;
    }
    #depth {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: #61bbff;
        border-radius: 4px;
        width: 80%;
        position: relative;
        bottom: 6%;
        border: 1.5px solid black;
        transform: rotate(-270deg);
    }

    #depth::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background: #ffd966;
        border-radius: 50%;
        box-shadow: 0 0 2px 1px #ffd966;
    }

    #depth::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: #ffd966;
        border-radius: 50%;
        box-shadow: 0 0 2px 1px #ffd966;
    }

    .number {
        position: relative;
        border-radius: 58%;
        padding: 3px;
        width: 50%;
        font-weight: bold;
        color: black;
        font-size: 14px;
        text-align: center;
        z-index: 10;
        bottom: -41px;
    }

    .img-button {
        all: unset;
        padding: 0;
        margin: 0;
    }

    .clickable-img {
        width: 30px;
        transition: transform 0.1s ease;
        background-color: transparent;
        z-index: 10;
    }

    .clickable-img:active {
        transform: scale(0.9);
    }

    .vertical button.hide-button {
        z-index: 10;
        position: relative;
    }

    .hide-button img {
        width: 16px;
        height: auto;
    }

    .top-right {
        position: absolute;
        top: 9%;
        right: 0.4%;
    }
    .top-left {
        position: absolute;
        top: 9%;
        left: 0.4%;
    }
    .bottom-left {
        position: absolute;
        top: 45%;
        left: 0.4%;
    }
    .bottom-right {
        position: absolute;
        top: 45%;
        right: 0.4%;
    }
</style>
