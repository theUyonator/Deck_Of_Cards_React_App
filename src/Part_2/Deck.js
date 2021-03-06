import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

// The Deck component uses the Deck of Cards API and allows user
//  to draw a single card at a time 


function Deck() {
    const[deck, setDeck] = useState(null);
    const[drawn, setDrawn] = useState([]);
    const[autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    // Load deck from API into state 
    useEffect(() => {
        async function getData(){
            let d = await axios.get(`${BASE_URL}/new/shuffle/`)
            setDeck(d.data);
        }
        getData();
    }, [setDeck]);

    // Draw one card evry second if autoDraw is true 

    useEffect(() => {
        // Draw a card from the API and add card to the drawn state 
        async function getCard(){
            const { deck_id } = deck;
            try{
                let cardRes = await axios.get(`${BASE_URL}/${deck_id}/draw/`);

                if (cardRes.data.remaining === 0 ){
                    setAutoDraw(false);
                    throw new Error("no cards remaining in this deck!");
                }
            

            const card = cardRes.data.cards[0];

            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: `${card.value} of ${card.suit}`,
                    image: card.image
                }
            ]);

            }catch(err){
                alert(err);
            }
};

if (autoDraw && !timerRef.current){
    timerRef.current = setInterval(async () =>{
        await getCard();
    }, 1000);
}

return () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
};

}, [autoDraw, setAutoDraw, deck]);

const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
};

const cards = drawn.map(c => [
    <Card key={c.id} name={c.name} image={c.image} />
])

return (
    <div className="Deck">
        {deck ? (
            <button className="Deck-toggler" onClick={toggleAutoDraw}>
                {autoDraw? "STOP" : "KEEP"} DRAWING!
            </button>
        ) : null}
        <div className="Deck-cardarea">{cards}</div>

    </div>
);

};


export default Deck;