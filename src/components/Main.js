import React from "react";
import imageLoading from "../images/loading.gif";
import Spinner from "./Spinner";
import { api } from "../utils/api";
import Card from "./Card";

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('загрузка...');
  const [userAvatar, setUserAvatar] = React.useState(imageLoading);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => { });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardsFromServer) => {
        setCards(cardsFromServer);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <main className="main page__content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img src={userAvatar} alt="Аватарка профиля" className="profile__avatar" />
            <button type="button" className="profile__avatar-btn" onClick={onEditAvatar} />
          </div>
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button type="button" className="profile__edit-btn" onClick={onEditProfile} />
        </div>
        <button type="button" className="profile__add-item-btn" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {isLoading
          ? (<Spinner />)
          : (
            cards.map((props, index) => <Card onCardClick={onCardClick} key={`${++index}.${props._id}`} {...props}  />)
          )


        }

      </section>
    </main>

  );
}

export default Main;
