import React from "react";

function Card (props) {

    function handleClick() {
        props.onCardClick(props);
      } 

    return (
        <article className="element" onClick={handleClick}>
            <img src="/" alt="" className="element__img" style={{ backgroundImage: `url(${props.link})` }} />
            <h3 className="element__title">{props.name}</h3>
            <div className="element__likes">
                <button type="button" className="element__like-btn"></button>
                <p className="element__like-count">{props.likes.length}</p>
            </div>
            <button type="button" className="element__trash-btn"></button>
        </article>
    );
}

export default Card;
