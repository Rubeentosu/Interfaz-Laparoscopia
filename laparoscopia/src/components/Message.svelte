<script>
    let message = "Error msg";
    function msg() {
        message = "test2";
    }
</script>
<style>
    .messages {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
        padding: 8px;
        color: white;
        height: 30px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        opacity: 80%;
        }
</style>
<div class="messages" on:click={msg}>
    <p>{message}</p>
</div>
