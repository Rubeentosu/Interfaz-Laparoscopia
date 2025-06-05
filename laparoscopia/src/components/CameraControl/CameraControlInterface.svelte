<script>
    import { scale } from "svelte/transition";
    import { CameraUIController, cameraHidden } from "./CameraUIController";

    export let cameraDepth;
    export let cameraMessageColor;

</script>
{#if $cameraHidden}
	<div class="camera-expand" style="border: 3px solid {cameraMessageColor};" transition:scale={{ duration: 500 }}>
        <div class="button-center">
            <button on:click={CameraUIController.show} class="img-button">
                <img src="./src/resources/imgs/expand.svg" alt="expand" class="clickable-img" />
            </button>
        </div>
	</div>
{:else}
<div class="camera" style="border: 3px solid {cameraMessageColor};">
    <div class="button-center" style="width: 30px;" transition:scale={{ duration: 100 }}>
        <button type="button" on:click={CameraUIController.hide} class="hide-button img-button"><img src="./src/resources/imgs/collapse.svg" style="width: 16px;" alt="collapse" class="clickable-img"/></button>
    </div>
    <img src="./src/resources/imgs/minun.png" alt="expand" class="minus" />
    <input type="range" min="0" max="15" bind:value={cameraDepth} id="camera" disabled style="width: 160px;"/> 
    <img src="./src/resources/imgs/plus.svg" alt="expand" class="plus" />
    <div class="camera-icon" style="background-color: {cameraMessageColor};">
        {#if cameraMessageColor === "#ff723e"}
        ⨉
        {:else}
            <i class="fa-solid fa-camera"></i> 
        {/if}
    </div>
    
</div>
{/if}
<style>
    .minus{
        width: 18px;
        height: 18px;
    }
    .plus{
        width: 18px;
        height: 18px;        
    }
    .camera {
        position: absolute;
        bottom: 0.3%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #07030342;
        padding: 7px 5px 7px 5px;
        border-radius: 15px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    }
    .camera-icon {
        position: relative;
        border-radius: 50%;
        padding: 3px;
        width: 16px;
        font-weight: bold;
        color: black;
        background-color: #B2FFD6;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;   
        z-index: 10;
        left: 16px;
    }
    .camera-expand {
        padding: 7px 9px 5px 9px;
        border-radius: 15px;
        background-color: #07030325;
        border: #09060a 2px solid;
        user-select: none;
        position: absolute;
        bottom: 0.6%;
        left: 50%;
        transform: translateX(-50%);
    }
    #camera {
        -webkit-appearance: none;
        appearance: none;
        height: 5px;
        background: #61bbff;
        border-radius: 4px;
        max-width: 400px;
        position: relative;
        border: 1.5px solid black;
    }

    #camera::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background:#ffd966;
        border-radius: 50%;
        box-shadow: 0 0 2px 1px #ffd966;
    }

    #camera::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: #ffd966;
        border-radius: 50%;
        box-shadow: 0 0 2px 1px #ffd966;
    }
    .img-button {
        all: unset;
        padding: 0;
        margin: 4px 4px 1px 4px;
    }

    .clickable-img {
        width: 20px;
        transition: transform 0.1s ease;
        background-color: transparent;
        z-index: 10;
    }

    .clickable-img:active {
        transform: scale(0.9);
    }

    .camera button.hide-button {
        z-index: 10;
        position: relative;
    }

    .hide-button img {
        width: 16px;
        height: auto;
    }
</style>
