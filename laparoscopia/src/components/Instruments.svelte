<script>
    export let depth = 0;
    export let position;
    export let number;
    export let points;
</script>
<style>
    .vertical{
        padding: 15px;
        transform: rotate(-270deg);
        border-radius: 15px;
        background-color: black; 
        width: 270px;
        opacity: 80%;
        display: flex;
        align-items: center;
    }
    .top-right{
        position: absolute;
        top: 30%;
        right: -4%;
    }
    .top-left{
        position: absolute;
        top: 30%;
        left: -4%;
    }
    .bottom-left{
        position: absolute;
        top: 70%;
        left: -4%;
    }
    .bottom-right{
        position: absolute;
        top: 70%;
        right: -4%;
    }
    .number {
        margin: auto;
        border: 1px solid white;
        border-radius: 50%;
        padding: 5px;
        width: 7%;
        color: white;
        transform: rotate(270deg);
        text-align: center;
        margin-left: 6px;
    }
    #depth {
    -webkit-appearance: none;
    height: 6px;
    background: rgb(255, 255, 255);
    border-radius: 3px;
    max-width: 400px;
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
</style>
<div class="vertical {position}" id="id-instrument1">
    <svg width="70" height="70" viewBox="0 0 100 100">
        <polyline id="instrument-1" points={points} stroke="white" stroke-width="3" fill="none"/>
    </svg>
    <input type="range" min="0" max="100" disabled bind:value={depth} id="depth" style="width: 160px;">
    <p class="number">{number}</p>
</div>    