class HashMap{
	constructor(size = 10) {
		this._hashTable = new Map();
		this.length = 0;
		this.capacity = size;
		this._deleted = 0;
		this._SIZE_RATIO = 3;
		this._MAX_LOAD = 0.5;
	}

	static _hashString(string) {
		let hash = 5381;
		for (let i = 0; i < string.length; i++) {
			//Bitwise left shift with 5 0s - this would be similar to
			//hash*31, 31 being the decent prime number
			//but bit shifting is a faster way to do this
			//tradeoff is understandability
			hash = (hash << 5) + hash + string.charCodeAt(i);
			//converting hash to a 32 bit integer
			hash = hash & hash;
		}
		//making sure hash is unsigned - meaning non-negative number.
		return hash >>> 0;
	}

	get(key) {
		const index = this._findIdx(key);
		if (this._hashTable[index] === undefined) throw new ReferenceError('Invalid key');
		return this._hashTable[index];
	}

	set(key, val) {
		const currentLoad = (this.length + this._deleted + 1) / this.capacity;
		if (currentLoad > this._MAX_LOAD) {
			this._resize(this.capacity * this._SIZE_RATIO);
		}
		const idx = this._findIdx(key);
		if (!this._hashTable[idx]) this.length++;
		this._hashTable[idx] = {
			key: key,
			value: val,
			DELETED: false,
		};
	}

	delete(key) {
		const data = this._hashTable[ this._findIdx(key) ];
		if (data === undefined) throw new ReferenceError('Invalid key');
		data.DELETED  = true;
		this.length--;
		this._deleted++;
	}

	_resize(size) {
		const oldTable = this._hashTable;
		this._hashTable = new Array(size);
		this.capacity = size;
		this.length = 0;
		this._deleted = 0;
		for (let data of oldTable) {
			if (data !== undefined || !data.DELETED) this.set(data.key, data.value);
		}
	}

	_findIdx(key) {
		const startIdx = HashMap._hashString(key) % this.capacity;
		for (let i = startIdx; i < startIdx + this.capacity; i++) {
			const idx = i % this.capacity;
			const val = this._hashTable[idx];
			if (val === undefined || (val.key === key && !val.DELETED)) return idx;
		}
	}
}

module.exports = HashMap;
