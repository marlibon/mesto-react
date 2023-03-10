import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import { useEffect, useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

import ImagePopup from "./ImagePopup";
import imageLoading from "../images/loading.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App () {
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [futureDeletedCard, setFutureDeletedCard] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({ name: 'загрузка', link: imageLoading });
  const [currentUser, setСurrentUser] = React.useState({ name: 'загрузка...', about: 'загрузка...', avatar: imageLoading, _id: '' });
  const [cards, setCards] = useState([]);
  const statesPopups = [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen, isConfirmDeletePopupOpen]

  /**
   2. github Pages
   3. валидация
   */
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
    setIsImagePopupOpen(true);
  }

  function handleCardLike (card, value) {
    api.setLike(card._id, value)
      .then((newCard) => {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch((error) => console.error(error))
  }

  function handleConfirmCardDelete (_id) {
    setFutureDeletedCard(_id);
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardDelete (_id) {
    setIsLoading(true);
    api.removeCard(_id)
      .then(() => {
        const newArrCards = cards.filter((item) => item._id !== _id);
        setCards(newArrCards);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    api.patchUserInfo(name, about)
      .then(({ name, about, avatar, _id }) => {
        setСurrentUser({ name, about, avatar, _id });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }
  function handleAddPlaceSubmit ({ title, url }) {
    setIsLoading(true);
    api.addCard(title, url)
      .then((newCard) => {
        setCards([...cards, newCard])
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });

  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true);
    api.replaceAvatar(avatar)
      .then(({ avatar }) => {
        const { name, about, _id } = currentUser
        setСurrentUser({ name, about, avatar, _id });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }
  function handleClickByOverlay (e) {
    e.currentTarget === e.target && closeAllPopups()

  }
  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard({ name: 'загрузка', link: imageLoading });
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([{ name, about, avatar, _id }, cardsFromServer]) => {
        setСurrentUser({ name, about, avatar, _id });
        setCards(cardsFromServer);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoadingCards(false));
  }, []);

  useEffect(() => {
    function handleKeyEsc (e) {
      e.key === 'Escape' && closeAllPopups()
    }
    statesPopups.some(state => state === true) && document.addEventListener('keydown', handleKeyEsc);

    return () => document.removeEventListener('keydown', handleKeyEsc)
  }, [statesPopups])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleConfirmCardDelete} onLoading={isLoadingCards} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} onClickByOverlay={handleClickByOverlay} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} onClickByOverlay={handleClickByOverlay} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} onClickByOverlay={handleClickByOverlay} />

        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} isLoading={isLoading} onCardDelete={handleCardDelete} onFutureDeletedCard={futureDeletedCard} onClickByOverlay={handleClickByOverlay} />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} onClickByOverlay={handleClickByOverlay} />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
