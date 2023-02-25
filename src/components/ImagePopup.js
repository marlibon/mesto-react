import React from "react";

function ImagePopup (props) {
    return (
        <section className={`popup popup_type_view-image ${props.name} ${
            props.isOpen
            ? 'popup_opened'
            : ''
            }`}>
            <div className="popup__container popup__container_image">
                <button type="button" className="popup__close" onClick={props.onClose} />
                <figure className="popup__fig">
                    <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                    <figcaption className="popup__description" >{props.card?.name}</figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;