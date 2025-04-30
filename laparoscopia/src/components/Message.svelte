<script>
	export let message = "Mensaje de prueba";
//     class ConsoleMessage {
//         constructor(text, type) {
//             this._text = text;
//             if(!type.instanceof(MessageType)){
//             throw new Error("Console message musth be created with a MessageType");
//             }//buscar en internet como hacer intance of en javascript)
//             this._type = type;
//         }

//         get text(){
//             return this._text;
//         }

//         get type(){
//             return this._type;
//         }
//         }

//     class MessageType{
//     static info = new MessageType("info");
//     static warning = new MessageType("warning");
//     static error = new MessageType("error");

//     constructor(type){
//         this._type = type;
//         if(type != "info" || type != "warning" || type != "error"){
//         throw new Error("Cant create Console Message with that type");
//         }
//     }
//     }
// let consoleMessage = new ConsoleMessage("test", MessageType.info);
</script>

{#if message}
	<div class="messages">
		<h3>{message}</h3>
	</div>
{/if}

<style>
    .messages {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
        padding: 4px 12px;
        color: white;
        opacity: 75%;
        height: auto;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .messages h3 {
        margin: 0;
    }
</style>

