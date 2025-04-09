<script>
    let zoom = 0;
    function change() {
        zoom = 50;
    }
</script>
<style>
    .camera {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    align-items:center ;
    justify-content: center;
    transform: translateX(-50%);
    background-color: black;
    padding: 8px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    opacity: 80%;
    }
    #camera{
    -webkit-appearance: none;
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
<div class="camera" on:click={change}>
    <label for="" style="color: white;">&#8722;&nbsp;</label><input type="range" min="0" max="100" bind:value={zoom} id="camera" disabled style="width: 160px;"><label for="" style="color: white;">&nbsp;&#43;</label>
</div>