export class ConsoleMessageUIController {
    static changeColor(type){
        if (type === "info") return '#31adff';
        if (type === "warning") return '#ffd966';
        if (type === "error") return '#ff723e';
    return '#B2FFD6';
    }

    static getHighestPriorityMessageType(messages, position) {
        const priority = {
            error: 3,
            warning: 2,
            info: 1
        };

        let bestType = null;
        let bestPriority = 0;

        for (const msg of messages) {
            if (msg.position === position) {
                const p = priority[msg.type._type];
                if (p > bestPriority) {
                    bestPriority = p;
                    bestType = msg.type;
                }
            }
        }

        return bestType;
    }
}