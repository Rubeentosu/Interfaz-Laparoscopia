<script>
    import {socket} from '../lib/serverConetion';
	export let depth;
	export let position;
	export let number;
	export let points;
	export let ln_left;
	export let ln_right;

	let hidden = false;

	function hideInstrument() {
		hidden = !hidden;
	}
</script>

{#if hidden}
	<div class="vertical-expand {position}">
        <div class="button-center">
            <button on:click={hideInstrument} class="img-button">
                <img src="./src/resources/imgs/expand.svg" alt="expand" class="clickable-img" />
            </button>
        </div>
	</div>
{:else}
	<div class="vertical {position}">
        <div class="button-center" style="width: 30px;">
		    <button type="button" class="hide-button img-button" style="transform: rotate(270deg);" on:click={hideInstrument}><img src="./src/resources/imgs/collapse.svg" style="width: 16px;" alt="collapse" class="clickable-img"/></button>
		</div>
        <svg width="200" height="200" viewBox="0 0 200 240" id="angle">
			<g id="forceps" transform="translate(100,100)">
				<polygon points={points} fill="red" />
				<line id="arm1" x1="0" y1="0" x2="0" y2="-60" stroke="white" stroke-width="5" transform={ln_right} />
				<line id="arm2" x1="0" y1="0" x2="0" y2="-60" stroke="white" stroke-width="5" transform={ln_left} />
			</g>
		</svg>
		<input type="range" min="0" max="20" disabled bind:value={depth} id="depth" style="width: 160px;">
		<p class="number">{number}</p>
	</div>
{/if}
<style>
    #angle{
        transform: rotate(270deg);
    }
    .vertical-expand{
        margin: 0 80px;
        padding: 15px 15px 12px 15px;
        border-radius: 15px;
        background-color: black;
        opacity: 75%;
    }
    .vertical {
        padding: 15px;
        transform: rotate(-270deg);
        border-radius: 15px;
        background-color: black;
        width: 270px;
        opacity: 75%;
        display: flex;
        align-items: center;
    }
    .top-right {
        position: absolute;
        top: 30%;
        right: -4%;
    }
    .top-left {
        position: absolute;
        top: 30%;
        left: -4%;
    }
    .bottom-left {
        position: absolute;
        top: 70%;
        left: -4%;
    }
    .bottom-right {
        position: absolute;
        top: 70%;
        right: -4%;
    }
    .number {
        border: 1px solid white;
        border-radius: 6px;
        padding: 3px;
        width: 7%;
        color: white;
        transform: rotate(270deg);
        text-align: center;
        margin-left: 10px;
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
		background-color: black;
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
        background: rgb(255, 255, 255);
        border-radius: 3px;
        max-width: 400px;
        margin-left: -60px;
    }

    #depth::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 25px;
        background: #00a2ff;
        position: relative;
    }
    #depth::-moz-range-thumb {
        width: 5px;
        height: 20px;
        border-radius: 50%;
        background: #00a2ff;
    }
    .vertical button.hide-button {
	z-index: 10;
	position: relative;
    }
    @media screen and (max-width: 1024px) {
        .vertical {
            width: 220px;
            height: 50px;
        }
        .vertical-expand{
            margin: 0px 45px;
        }
    }

    @media screen and (min-width: 1440px) {
        .vertical {
            width: 250px;
            height: 50px;
        }
    }
    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        .vertical {
            width: 250px; 
            height: 50px;
        }
        .vertical-expand{
            margin: 0px 60px;        
        }
    }
</style>
