class DeckOfCards {
  private cards: string[] = [];

  constructor() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

    for (let suit in suits) {
      for (let value in values) {
        this.cards.push(`${values[value]} of ${suits[suit]}`);
      }
    }
  }

  shuffle() {
    let currentIndex = this.cards.length;

    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex -= 1;

      let tempValue = this.cards[currentIndex];

      this.cards[currentIndex] = this.cards[randomIndex];

      this.cards[randomIndex] = tempValue;
    }

    return this.cards;
  }
}

// const deckOfCards = new DeckOfCards();
// deckOfCards.shuffle();
