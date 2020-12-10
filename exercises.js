const HashMap = require('./hashMap');

const WhatDoesThisDo = function() {
	let str1 = 'Hello World.';
	let str2 = 'Hello World.';
	let map1 = new HashMap();
	map1.set(str1, 10);
	map1.set(str2, 20);
	let map2 = new HashMap();
	let str3 = str1;
	let str4 = str2;
	map2.set(str3, 20);
	map2.set(str4, 10);

	console.log(map1.get(str1));
	console.log(map2.get(str3));
};

console.log(
	(function removeDups(word) {
		const usedLetters = new Map();
		let string = '';
		for (let i = 0; i < word.length; ++i) {
			if (usedLetters.has(word[i])) continue;
			string += word[i];
			usedLetters.set(word[i], null);
		}
		return string;
	})('google')
);

function isPalindrome(word) {
	const letters = new Map();
	for (let i = 0; i < word.length; i++) {
		if (letters.has(word[i])) {
			letters.set(word[i], letters.get(word[i]) + 1);
		} else {
			letters.set(word[i], 1);
		}
	}
	if (word.length % 2 === 0) return word.length / 2 === letters.size;
	return Math.ceil(word.length / 2) === letters.size;
}

console.log(isPalindrome('mmo'));
console.log(isPalindrome('north')); //true
console.log(isPalindrome('racecar')); //true
