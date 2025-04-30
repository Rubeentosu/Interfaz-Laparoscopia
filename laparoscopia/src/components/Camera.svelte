<script>
    let videoElement;

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error("Error ", error);
        }
    };

    import { onMount } from "svelte";
    onMount(() => {
        startCamera();
    });
</script>

<video bind:this={videoElement} autoplay muted class="background-video"></video>

<style>
    .background-video {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: -1;
    }
</style>
