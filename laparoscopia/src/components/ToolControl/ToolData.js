export class ToolData {
    constructor(toolDepth, toolAngle, toolPosition) {
		if (toolDepth < 0 || toolDepth > 15) {
			throw new Error("The Tool Depth must be a number between 0 and 15");
		}else{
			this._toolDepth = toolDepth;	
		}
		if (toolAngle < 0 || toolAngle > 90) {
			throw new Error("The Tool Angle must be a number between 0 and 90");
		}else{
			this._toolAngle = toolAngle;
		}
		if(toolPosition > 4 || toolPosition < 1){
			throw new Error("The Tool Positon must be a number between 1 and 4");
		}else{
			this._toolPosition = toolPosition;
		}
        this._toolOpening = this.openingAngle();
	}
	get toolDepth() {
		return this._toolDepth;
	}
	set toolDepth(value) {
		this._toolDepth = value;
    }
    get toolAngle() {
		return this._toolAngle;
	}
	set toolAngle(value) {
		this._toolAngle = value;
    }
	get toolPosition() {
		return this._toolPosition;
	}
	set toolPosition(value) {
		this._toolPosition = value;
    }
	get toolOpening() {
		return this._toolOpening;
	}
    openingAngle() {
		let anglePosition = this._toolAngle;
		let fill;
		if (anglePosition <= 14) {
			fill = 3;
		} else {
			fill = anglePosition - 10;
		}
		let position = String(fill);
		return `0,0 -${position},-30 ${position},-30`;
	}
	deleteTool(array){
        array.shift();
        return array;
    }
    addTool(array){
        array.push(this);
        return array;
    }
}