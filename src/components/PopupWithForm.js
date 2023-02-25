import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${
    props.isOpen
    ? 'popup_opened'
    : ''
    }`}>
    <div className="popup__container">
      <button type="button" className="popup__close" onClick={props.onClose}/>
      <h3 className="popup__title">{props.title}</h3>
      <form name={`form_${props.name}`} action="/" className={`form form_${props.name}`}>
        {props.children}
        <button type="submit" name="form__submit" className="form__submit">{props.textButton}</button>
      </form>
    </div>
  </section>

  );
}

export default PopupWithForm;
