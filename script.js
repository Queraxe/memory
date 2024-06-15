// aufbau

let box = document.getElementsByClassName("box")[0];

let infill = [
	["hallo", "hello"],
	["ich bin", "i am"],
];

function flattenArray(array) {
	return array.reduce((acc, val) => acc.concat(val), []);
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

let flattenedInfill = flattenArray(infill);
let shuffleFlattenedInfill = shuffle(flattenedInfill);

for (let string of shuffleFlattenedInfill) {
	let div = document.createElement("div");
	div.classList.add("card");

	let span = document.createElement("span");
	span.innerHTML = string;

	div.appendChild(span);
	box.appendChild(div);
}

let counter = 0;
let first;
let second;

for (let card of document.getElementsByClassName("card")) {
	card.onclick = function () {
		counter++;
		if (counter === 1) {
			first = this.children[0].innerHTML;
		}
		this.children[0].style.opacity = 1;
		if (counter === 2) {
			second = this.children[0].innerHTML;
			if (first != second) {
				check();
				sleep(1000).then(() => {
					invisible();
				});
				counter = 0;
			} else {
				counter--;
			}
		}
	};
}

function check() {
	console.log(theSame(first, second));

	first = null;
	second = null;
}

function theSame(fi, se) {
	let same;
	for (let arr of infill) {
		if (arr.includes(first) && arr.includes(second)) {
			same = true;
			break;
		} else {
			same = false;
		}
	}
	return same;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function invisible() {
	for (element of document.getElementsByClassName("card")) {
		element.children[0].style.opacity = 0;
	}
}
