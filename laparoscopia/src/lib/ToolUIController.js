import { writable } from 'svelte/store';
import { ToolData } from './ToolData.js';

export const toolHide = [
	writable(false),
	writable(false),
	writable(false),
	writable(false)
];
export class ToolUIController{
	static hide(store) {
		store.set(true);
	}
	static show(store) {
		store.set(false);
	}
}

export const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];