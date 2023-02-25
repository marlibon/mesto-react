import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import imageLoading from "../images/loading.gif";

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: 'загрузка', link: imageLoading });

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: 'загрузка', link: imageLoading });
  }

  return (
    <div className='page'>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} textButton="Сохранить" >
        <input type="text" placeholder="Имя" className="form__input form__input_name" name="name" id="name" minLength={2} maxLength={40} required />
        <span className="form__error name-error" />
        <input type="text" placeholder="Род деятельности" className="form__input form__input_about" name="about" id="about" minLength={2} maxLength={200} required />
        <span className="form__error about-error" />
      </PopupWithForm>

      <PopupWithForm name="add-element" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} textButton="Создать" >
        <input type="text" placeholder="Название" className="form__input form__input_title" name="title" id="title" minLength={2} maxLength={30} required />
        <span className="form__error title-error" />
        <input placeholder="Ссылка на картинку" className="form__input form__input_url" type="url" name="url" id="url" required />
        <span className="form__error url-error" />
      </PopupWithForm>

      <PopupWithForm name="replace-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} textButton="Сохранить" >
        <input placeholder="Ссылка на картинку" className="form__input form__input_url" type="url" name="url" id="url-avatar" required />
        <span className="form__error url-avatar-error" />
      </PopupWithForm>

      <PopupWithForm name="confirmation" title="Вы уверены?" isOpen={false} onClose={closeAllPopups} textButton="Да" />

      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />

    </div>

  );
}

export default App;
