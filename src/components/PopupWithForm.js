import React from "react";

function PopupWithForm ({name, title, textButton, isOpen, onClose, children}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form name={`form_${name}`} action="/" className={`form form_${name}`}>
          {children}
          <button type="submit" name="form__submit" className="form__submit">{textButton}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
