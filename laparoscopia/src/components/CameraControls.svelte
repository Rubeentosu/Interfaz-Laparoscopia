<script>
    export let zoom;
</script>

<div class="camera">
    <input type="range" min="0" max="20" bind:value={zoom} id="camera" disabled style="width: 160px;"/> 
</div>

<style>
    .camera {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
        padding: 8px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        opacity: 75%;
    }
    #camera {
        -webkit-appearance: none;
        appearance: none;
        height: 6px;
        background: rgb(255, 255, 255);
        border-radius: 3px;
        max-width: 400px;
    }

    #camera::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 25px;
        background: #00a2ff;
        position: relative;
    }

    #camera::-moz-range-thumb {
        width: 5px;
        height: 20px;
        border-radius: 50%;
        background: #00a2ff;
    }
</style>
