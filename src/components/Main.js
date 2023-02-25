import {useEffect, useState} from 'react';
import imageLoading from "../images/loading.gif";
import Spinner from "./Spinner";
import { api } from "../utils/api";
import Card from "./Card";

function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('загрузка...');
  const [userAvatar, setUserAvatar] = useState(imageLoading);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsFromServer]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
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
          : ( cards.map(({_id, ...props}) => <Card onCardClick={onCardClick} key={_id} {...props} />) )
        }
      </section>
    </main>

  );
}

export default Main;