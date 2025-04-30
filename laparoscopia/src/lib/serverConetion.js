import { io } from "socket.io-client";

	export const socket = io("http://localhost:3000");

	export let zoom;
	export let numInstrument;
	export let msg;
	export let depths = [];
	export let pointsArray = [];
	export let lnLeftArray = [];
	export let lnRightArray = [];
	export let positions = [];

	export let ServerInstrument = [];

	export function points(angle) {
		let fill;
		if(angle <= 14){
			fill = 3;
		}else{
			fill = angle -10;
		}
		let position = String(fill);
		return `0,0 -${position},-30 ${position},-30`;
	}

	export function handleAddInstrument(event) {
		const position = event.detail.position;
		const index = depths.length;

		if (index >= ServerInstrument.length) return;

		const data = ServerInstrument[index];

		depths.push(data.depth);
		pointsArray.push(points(data.ln));
		lnLeftArray.push(`rotate(-${data.ln})`);
		lnRightArray.push(`rotate(${data.ln})`);
		positions.push(position);

		depths = [...depths];
		pointsArray = [...pointsArray];
		lnLeftArray = [...lnLeftArray];
		lnRightArray = [...lnRightArray];
		positions = [...positions];
	}

	socket.on("instrument", (data) => {
		ServerInstrument = data;

		for (let i = 0; i < depths.length; i++) {
			depths[i] = data[i].depth;
			pointsArray[i] = points(data[i].ln);
			lnLeftArray[i] = `rotate(-${data[i].ln})`;
			lnRightArray[i] = `rotate(${data[i].ln})`;
		}

		depths = [...depths];
		pointsArray = [...pointsArray];
		lnLeftArray = [...lnLeftArray];
		lnRightArray = [...lnRightArray];
	});
	socket.on("camera", (data) => {
		zoom = data;
	});
	socket.on("numInstrument", (data) => {
		numInstrument = data;
	});
	socket.on("msg", (data) => {
		msg = data;
	});