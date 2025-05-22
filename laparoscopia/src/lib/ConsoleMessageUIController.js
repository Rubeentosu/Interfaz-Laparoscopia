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

        for (const message of messages) {
            if (message.position === position) {
                const typePriority = priority[message.type._type];
                if (typePriority > bestPriority) {
                    bestPriority = typePriority;
                    bestType = message.type;
                }
            }
        }
        return bestType;
    }
}