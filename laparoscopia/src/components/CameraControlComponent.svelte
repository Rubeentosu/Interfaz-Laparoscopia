<script>
	export let cameraDepth;

    $: sliderColor = cameraDepth > 10 ? '#FF8864' : cameraDepth > 5 ? '#ffd966' : '#B2FFD6';
</script>

<div class="camera">
    <input type="range" min="0" max="15" bind:value={cameraDepth} id="camera" disabled style="--slider-color: {sliderColor}; width: 160px;"/> 
</div>

<style>
    .camera {
        position: absolute;
        bottom: 0.3%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #07030342;
        border: 2px solid #09060a;
        padding: 4px 5px 8px 5px;
        border-radius: 20px;
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
        background: var(--slider-color);
        border-radius: 50%;
        box-shadow: 0 0 2px 1px var(--slider-color);
    }

    #camera::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: var(--slider-color);
        border-radius: 50%;
        box-shadow: 0 0 2px 1px var(--slider-color);
    }
</style>
