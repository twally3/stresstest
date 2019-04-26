export default class PostsList {
	constructor(target) {
		this.target = target;
	}

	updateBody(posts) {
		const cardElements = posts.map(({ title, body }) =>
			this._createCardElement(title, body)
		);

		cardElements.forEach(cardElement => this.target.appendChild(cardElement));
	}

	clear() {
		while (this.target.firstChild)
			this.target.removeChild(this.target.firstChild);
	}

	_createCardElement(title, body) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');

		const titleElement = document.createElement('h1');
		titleElement.innerText = title;

		const bodyElement = document.createElement('p');
		bodyElement.innerText = body;

		[titleElement, bodyElement].forEach(x => cardElement.appendChild(x));

		return cardElement;
	}
}
