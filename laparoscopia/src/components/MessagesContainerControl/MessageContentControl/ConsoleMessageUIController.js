import { ConsoleMessageData } from "./ConsoleMessageData";

export class ConsoleMessageUIController {
    constructor(messageDataInstance) {
            if (!(messageDataInstance instanceof ConsoleMessageData)) {
                throw new Error('Se requiere una instancia de ConsoleMessageData');
            }
    
            this.message = messageDataInstance;
        }
        getMessage() {
            return this.message;
        }
        addMessage(array){
            array.push(this);
            return array;
        }
        deleteMessage(array){
            array.shift();
            return array;
        }
        deleteAllMessage(array){
            array.length = 0;
            return array;
        }
        changeColor(type){
            if (type === "warning") return '#ffd966';
            if (type === "error") return '#ff723e';
        return '#B2FFD6';
        }

        getHighestPriorityMessageType(messages, position) {
            const priority = { error: 2, warning: 1 };
            let bestType = null;
            let bestPriority = 0;
        
            for (const messageController of messages) {
            const message = messageController.getMessage();    
            if (message.position === position) {
                const typePriority = priority[message.type._type] || 0;
                if (typePriority > bestPriority) {
                bestPriority = typePriority;
                bestType = message.type;
                }
            }
            }
            return bestType;
        } 
}