export class ConsoleMessage {
    constructor(text, type) {
        this._text = text;
        if(!(type instanceof MessageType)){
        throw new Error("Console message must be created with a MessageType");
        }
        this._type = type;
    }

    get text(){
        return this._text;
    }

    get type(){
        return this._type;
    }
}

export class MessageType{
    static info = new MessageType("info");
    static warning = new MessageType("warning");
    static error = new MessageType("error");

    constructor(type){
        this._type = type;
        if(type != "info" && type != "warning" && type != "error"){
        throw new Error("Cant create Console Message with that type");
        }
    }
}
