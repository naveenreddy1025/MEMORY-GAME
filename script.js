const cards = [
    { id: 1, value: 'A' }, { id: 2, value: 'A' },
    { id: 3, value: 'B' }, { id: 4, value: 'B' },
    { id: 5, value: 'C' }, { id: 6, value: 'C' },
    { id: 7, value: 'D' }, { id: 8, value: 'D' },
    { id: 9, value: 'E' }, { id: 10, value: 'E' },
    { id: 11, value: 'F' }, { id: 12, value: 'F' },
    { id: 13, value: 'G' }, { id: 14, value: 'G' },
    { id: 15, value: 'H' }, { id: 16, value: 'H' }
];

let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add('flip');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards += 2;
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];

    if (matchedCards === cards.length) {
        setTimeout(() => alert('Congratulations! You won!'), 500);
    }
}

createBoard();
