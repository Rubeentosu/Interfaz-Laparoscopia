import { writable } from 'svelte/store';

export const toolHide = [
	writable(false),
	writable(false),
	writable(false),
	writable(false)
];
export class ToolUIController{
	static hide(toolVisibility) {
		toolVisibility.set(true);
	}
	static show(toolVisibility) {
		toolVisibility.set(false);
	}
}

