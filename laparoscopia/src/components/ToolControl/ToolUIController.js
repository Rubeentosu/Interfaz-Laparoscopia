import { ToolData } from "./ToolData";

export class ToolUIController {
	constructor(toolDataInstance) {
		if (!(toolDataInstance instanceof ToolData)) {
			throw new Error('Se requiere una instancia de ToolData');
		}

		this.tool = toolDataInstance;
		this.visible = true;
	}

	hide(){
		this.visible = false;
	}

	show(){
		this.visible = true;
	}
	getTool() {
		return this.tool;
	}
}
