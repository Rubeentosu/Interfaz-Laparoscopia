<script>
	export let cameraDepth;
	export let control; 

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
        border-radius: 3px;
        max-width: 400px;
        position: relative;
    }

    #camera::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        background: var(--slider-color);
        border-radius: 50%;
    }

    #camera::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: var(--slider-color);
        border-radius: 50%;
    }
</style>
