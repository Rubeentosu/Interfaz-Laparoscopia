<script>
    import Camera from "./components/Camera.svelte";
    import Message from "./components/Message.svelte";
    import Instruments from "./components/Instruments.svelte";
    import CameraControls from "./components/CameraControls.svelte";

    let depth1 = 0;
    let depth2 = 0;
    let depth3 = 0;
    let depth4 = 0;

    let points1 = "10,-40 80,50 10,140";
    let points2 = "10,-40 80,50 10,140";
    let points3 = "10,-40 80,50 10,140";
    let points4 = "10,-40 80,50 10,140";


</script>
<CameraControls/>
<Message/>
<Instruments position = 'top-right' number = 1 bind:depth = {depth1} points = {points1}/>
<Instruments position = 'top-left' number = 2 bind:depth = {depth2} points = {points2}/>
<Instruments position = 'bottom-left' number = 3 bind:depth = {depth3} points = {points3}/>
<Instruments position = 'bottom-right' number = 4 bind:depth = {depth4} points = {points4}/>
<style>
    :global(body){
        background-color: antiquewhite;
    }
</style>