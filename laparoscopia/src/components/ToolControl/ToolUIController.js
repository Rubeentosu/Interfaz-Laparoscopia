import { ToolData } from "./ToolData";

export class ToolUIController {
	constructor(toolDataInstance) {
		if (!(toolDataInstance instanceof ToolData)) {
			throw new Error('Se requiere una instancia de ToolData');
		}

		this.tool = toolDataInstance;
		this.visible = true;
	}

	hideTool(){
		this.visible = false;
	}

	showTool(){
		this.visible = true;
	}
	getTool() {
		return this.tool;
	}
	assignToolPosition(position){
		switch(position){
			case 1:
				return "top-right";
			case 2:
				return "top-left";
			case 3:
				return "bottom-left";
			case 4:
				return "bottom-right";	
		}
	}
	
}
