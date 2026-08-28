import { useState, useEffect } from 'react';

function Cards() {
    const [cards, setCards] = useState([])
    const [clickedCards, setClickedCards] = useState([])
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    useEffect(() => {
        const fetchCards = async () => {
            const responce = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=zoXwl3gORbYOJWQ36wuFtGHJTDrm8rjW&q=pokemon&limit=12&rating=g`)
            const cardsData = await responce.json()
            setCards(cardsData.data)
        }
        fetchCards()
    }, [])

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            setClickedCards([])
            setScore(0);
            setCards(shuffleArray(cards));
            return
        }
        const newScore = score + 1;
        const newClickedCards = [...clickedCards, id];

        setClickedCards(newClickedCards)
        setScore(newScore)

        if (newScore > bestScore) {
            setBestScore(newScore)
        }
        if (newClickedCards.length === cards.length) {
            setClickedCards([])
            setScore(0)
        }
        setCards(shuffleArray(cards))
    }

    return (
      <div className="min-h-screen bg-[#ffe2c0] flex flex-col items-center">
        <main className="w-full max-w-5xl px-6 py-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-4 w-full">
            {cards.map((card) => (
              <div key={card.id} className="cursor-pointer">
                <img
                  onClick={() => handleCardClick(card.id)}
                  src={card.images.fixed_height.url}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                />
                <p className="text-xs font-bold mt-2 truncate text-center">{card.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-base font-bold text-gray-900">
            Score: {score} | Best: {bestScore}
          </div>
        </main>
      </div>
    );
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default Cards;
