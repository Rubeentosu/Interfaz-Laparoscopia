<script>
    import { scale } from 'svelte/transition';
	export let toolDepth;
	export let toolPosition;
	export let toolNumber;
	export let toolAngle;
	export let toolLineLeft;
	export let toolLineRight;

	let hidden = false;

	function hideTool() {
		hidden = !hidden;
	}
    $: sliderColor = toolDepth > 10 ? '#ff723e' : toolDepth > 5 ? '#ffd966' : '#B2FFD6';
   
	let angleColor;

	$: {
		const point1 = toolAngle.split(' ')[1]; 
		const point2 = toolAngle.split(' ')[2]; 

		const x1 = parseFloat(point1.split(',')[0]);
		const x2 = parseFloat(point2.split(',')[0]); 

		const angleWidth = x2 - x1;

		if (angleWidth <= 30) {
			angleColor = '#B2FFD6';
		} else if (angleWidth <= 50) {
			angleColor = '#ffd966';
		} else if (angleWidth <= 60) {
			angleColor = '#ff723e';
		}
	}

</script>

{#if hidden}
	<div class="vertical-expand {toolPosition}" transition:scale={{ duration: 500 }}>
        <div class="button-center">
            <button on:click={hideTool} class="img-button">
                <img src="./src/resources/imgs/expand.svg" alt="expand" class="clickable-img" />
            </button>
        </div>
	</div>
{:else}
	<div class="vertical {toolPosition}" style="--slider-color: {sliderColor};" transition:scale={{ duration: 500 }}>
        <div class="button-center" style="width: 30px;">
		    <button type="button" class="hide-button img-button" on:click={hideTool}><img src="./src/resources/imgs/collapse.svg" style="width: 16px;" alt="collapse" class="clickable-img"/></button>
		</div>
        <svg width="200" height="200" viewBox="0 0 200 240" id="angle">
			<g id="forceps" transform="translate(100,100)">
				<polygon points={toolAngle} fill={angleColor} />
                <line x1="0" y1="0" x2="0" y2="-60" stroke="black" stroke-linecap="round" stroke-width="10" transform={toolLineRight} />
				<line x1="0" y1="0" x2="0" y2="-60" stroke="black" stroke-linecap="round" stroke-width="10" transform={toolLineLeft} />
				<line id="arm1" x1="0" y1="0" x2="0" y2="-60" stroke="#61bbff" stroke-linecap="round" stroke-width="7" transform={toolLineRight} />
				<line id="arm2" x1="0" y1="0" x2="0" y2="-60" stroke="#61bbff" stroke-linecap="round" stroke-width="7" transform={toolLineLeft} />
                
			</g>
		</svg>
		<input type="range" min="0" max="15" disabled bind:value={toolDepth} id="depth" style="--slider-color: {sliderColor}; width: 100px;">
		<p class="number">{toolNumber}</p>
	</div>
{/if}
<style>
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
        border: 2px solid var(--slider-color);
        background-color: #0703033a;
        height: 200px;
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
        border: 1.5px solid black;
        transform: rotate(-270deg);
    }

    #depth::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background: var(--slider-color);
        border-radius: 50%;
        box-shadow: 0 0 2px 1px var(--slider-color);
    }

    #depth::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: var(--slider-color);
        border-radius: 50%;
        box-shadow: 0 0 2px 1px var(--slider-color);
    }

    .number {
        position: relative;
        border-radius: 58%;
        padding: 3px;
        width: 50%;
        font-weight: bold;
        color: rgb(0, 0, 0);
        background-color: var(--slider-color);
        text-align: center;
        z-index: 10;
        bottom: -43px;
    }

    .img-button {
        all: unset;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }

    .clickable-img {
        width: 30px;
        cursor: pointer;
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
        top: 10%;
        right: 0.3%;
    }
    .top-left {
        position: absolute;
        top: 10%;
        left: 0.3%;
    }
    .bottom-left {
        position: absolute;
        top: 50%;
        left: 0.3%;
    }
    .bottom-right {
        position: absolute;
        top: 50%;
        right: 0.3%;
    }
</style>
