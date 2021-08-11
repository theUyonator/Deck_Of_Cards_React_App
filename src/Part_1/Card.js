import React, { useState } from "react";
import "./Card.css";

// This card component renders a single card from the deck 

function Card({ name, image }){

    const [{angle, xpos, ypos}] = useState({
        angle: Math.random() * 90 - 45,
        xpos: Math.random() * 40 - 20,
        ypos: Math.random() * 40 - 20
    });

    const transform = `translate(${xpos}px, ${ypos}px) rotate(${angle}deg)`;

    return (
        <img className="Card"
            alt={name}
            src={image}
            style={{transform}}
        />
        
    );
    

};

export default Card;