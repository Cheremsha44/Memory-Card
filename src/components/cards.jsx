import { useState, useEffect } from 'react';

function Cards() {
    const [cards, setCards] = useState([])
    useEffect(() => {
        const fetchCards = async () => {
            const responce = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=zoXwl3gORbYOJWQ36wuFtGHJTDrm8rjW&q=pokemon&limit=12&rating=g`)
            const cardsData = await responce.json()
            setCards(cardsData.data)
        }
        fetchCards()
    }, [])
    return (
        <div className="grid grid-flow-col grid-cols-6 grid-rows-2 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="">
                    <img src={card.images.fixed_height.url} alt={card.title} className="w-full h-40 object-cover rounded" />
                    <p className="text-sm font-bold mt-2 truncate w-full text-center">{card.title}</p>
                </div>
            ))}
        </div>
    );
}

export default Cards;
