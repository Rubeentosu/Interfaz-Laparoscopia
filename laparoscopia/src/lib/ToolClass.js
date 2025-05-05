export class ToolClass {
    constructor(toolDepth, toolAngle) {
        this._toolDepth = toolDepth;
        this._toolAngle = toolAngle;
        this._toolOpening = this.points();
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
    points() {
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
}