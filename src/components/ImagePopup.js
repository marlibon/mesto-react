import React from "react";

function ImagePopup ({ card, isOpen, onClose, onClickByOverlay }) {

    return (
        <section className={`popup popup_type_view-image ${isOpen && 'popup_opened'}`} onClick={onClickByOverlay}>
            <div className="popup__container popup__container_image">
                <button type="button" className="popup__close" onClick={onClose} />
                <figure className="popup__fig">
                    <img className="popup__image" src={card?.link} alt={card?.name} />
                    <figcaption className="popup__description" >{card?.name}</figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;