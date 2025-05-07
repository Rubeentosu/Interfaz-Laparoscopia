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
    $: sliderColor = toolDepth > 10 ? '#FF8864' : toolDepth > 5 ? '#ffd966' : '#B2FFD6';
   
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
			angleColor = '#FF8864';
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
	<div class="vertical {toolPosition}" transition:scale={{ duration: 500 }}>
        <div class="button-center" style="width: 30px;">
		    <button type="button" class="hide-button img-button" style="transform: rotate(270deg);" on:click={hideTool}><img src="./src/resources/imgs/collapse.svg" style="width: 16px;" alt="collapse" class="clickable-img"/></button>
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
    #angle{
        transform: rotate(270deg);
    }
    .vertical-expand{
        margin: 0 80px;
        padding: 12px 12px 9px 12px;
        border-radius: 15px;
        background-color: #07030325;
        border: #09060a 2px solid;
        user-select: none;
    }
    .vertical {
        padding: 15px;
        transform: rotate(-270deg);
        border-radius: 15px;
        border: 2px solid #09060a;
        background-color: #0703033a;
        width: 270px;
        display: flex;
        align-items: center;
        user-select: none;
    }
    .top-right {
        position: absolute;
        top: 20%;
        right: -4%;
    }
    .top-left {
        position: absolute;
        top: 20%;
        left: -4%;
    }
    .bottom-left {
        position: absolute;
        top: 60%;
        left: -4%;
    }
    .bottom-right {
        position: absolute;
        top: 60%;
        right: -4%;
    }
    .number {
        border: 2px solid #09060a;
        border-radius: 50%;
        padding: 3px;
        width: 15%;
        font-weight: bold;
        color: rgb(255, 255, 255);
        background-color: #09060a;
        transform: rotate(270deg);
        text-align: center;
        margin-left: 10px;
        position: relative;
        left: 13%;
        z-index: 10;
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
    .button-center {
	display: flex;
    background-color: transparent;
	}
    #depth {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: #61bbff;
        border-radius: 4px;
        max-width: 400px;
        margin-left: -60px;
        position: relative;
        left: 11%;
        border: 1.5px solid black;
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
    .vertical button.hide-button {
	z-index: 10;
	position: relative;
    }
    @media screen and (max-width: 1024px) {
        .vertical {
            width: 200px;
            height: 30px;
        }
        .vertical-expand{
            margin: 0px 85px;
        }
        .top-right {
            top: 20%;
            right: -8%;
        }
        .top-left {
            top: 20%;
            left: -8%;
        }
        .bottom-left {
            top: 60%;
            left: -8%;
        }
        .bottom-right {
            position: absolute;
            top: 60%;
            right: -8%;
        }
    }

    @media screen and (min-width: 1440px) {
        .vertical {
            width: 190px;
            height: 30px;
        }
        .vertical-expand{
            margin: 0px 80px;
            padding: 14px 14px 9px 14px;
        }
    }
    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        .vertical {
            width: 190px; 
            height: 30px;
        }
        .vertical-expand{
            margin: 0px 80px;        
        }
        #depth {
        position: relative;
        left: 12%;
        }
        .top-right {
            top: 20%;
            right: -5%;
        }
        .top-left {
            top: 20%;
            left: -5%;
        }
        .bottom-left {
            top: 60%;
            left: -5%;
        }
        .bottom-right {
            position: absolute;
            top: 60%;
            right: -5%;
        }
    }
</style>
