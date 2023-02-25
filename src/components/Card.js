import React from "react";

function Card ({name, link, likes, onCardClick}) {

    function handleClick () {
        onCardClick({name, link});
    }

    return (
        <article className="element" onClick={handleClick}>
            <img src="/" alt="" className="element__img" style={{ backgroundImage: `url(${link})` }} />
            <h3 className="element__title">{name}</h3>
            <div className="element__likes">
                <button type="button" className="element__like-btn"></button>
                <p className="element__like-count">{likes.length}</p>
            </div>
            <button type="button" className="element__trash-btn"></button>
        </article>
    );
}

export default Card;
