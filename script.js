// aufbau

let box = document.getElementsByClassName("box")[0];

let infill = [
	["hallo", "hello"],
	["ich bin", "i am"],
	["danke", "thank you"],
	["bitte", "please"],
	["tschüss", "goodbye"],
	["ja", "yes"],
	["nein", "no"],
	["Entschuldigung", "sorry"],
	["wie geht's?", "how are you?"],
	["gut", "good"],
	["schlecht", "bad"],
	["Essen", "food"],
	["trinken", "drink"],
	["Wasser", "water"],
	["Hilfe", "help"],
	["Freund", "friend"],
	["Haus", "house"],
	["Auto", "car"],
	["Arbeit", "work"],
	["Schule", "school"],
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
			first = this;
		}
		this.children[0].style.opacity = 1;
		if (counter === 2) {
			second = this;
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
	let same = theSame(
		first.children[0].innerHTML,
		second.children[0].innerHTML
	);

	if (same) {
		first.style.background = "green";
		second.style.background = "green";
		sleep(1000).then(() => {
			first.style.visibility = "hidden";
			second.style.visibility = "hidden";
			first = null;
			second = null;
		});
	} else {
		first.style.background = "red";
		second.style.background = "red";
	}

	sleep(1000).then(() => {
		first.style.background = "rgb(92, 131, 41)";
		second.style.background = "rgb(92, 131, 41)";
		first = null;
		second = null;
	});
}

function theSame(fi, se) {
	let same;
	for (let arr of infill) {
		if (arr.includes(fi) && arr.includes(se)) {
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
