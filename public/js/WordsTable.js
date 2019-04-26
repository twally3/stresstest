export default class WordsTable {
	constructor(tableContainer) {
		this.tableContainer = tableContainer;
		this.wordTable = tableContainer.querySelector('table');
	}

	clear() {
		const tableBody = this.wordTable.querySelector('tbody');
		if (tableBody) this.wordTable.removeChild(tableBody);
	}

	updateBody(sortedWords, totalWordCount) {
		const newBody = sortedWords
			.map(([word, count]) =>
				this._createTableRow(word, (count / totalWordCount) * 100)
			)
			.reduce((current, row) => {
				current.appendChild(row);
				return current;
			}, document.createElement('tbody'));
		this.wordTable.appendChild(newBody);
	}

	_createTableRow(word, count) {
		const row = document.createElement('tr');

		const [wordCell, countCell] = ['td', 'td'].map(x =>
			document.createElement(x)
		);

		wordCell.innerText = word;
		countCell.innerText = count.toFixed(1);

		[wordCell, countCell].forEach(x => row.appendChild(x));

		return row;
	}
}
