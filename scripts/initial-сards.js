import { cardContainer } from './index.js';
import { Card } from './Card.js';
const initialCards = [{
        name: 'Домбай',
        link: './images/element__image-dombai.jpg'
    },
    {
        name: 'Лес Тахо',
        link: './images/element__image-forestTahoe.jpg'
    },
    {
        name: 'Карачевск',
        link: './images/element__image-karachevsk.jpg'
    },
    {
        name: 'Озеро Тахо',
        link: './images/element__image-lakeTahoe.jpg'
    },
    {
        name: 'Гора Эльбрус',
        link: './images/element__image-mounainElbrus.jpg'
    },
    {
        name: 'Мауна Кеа',
        link: './images/element__image-observatory.jpg'
    }
];
initialCards.forEach((item) => { // загрузить стартовые карточки из списка
    const cardObject = {
        name: item.name,
        link: item.link,
        template: "#card"
    }
    const newCard = new Card(cardObject);
    cardContainer.prepend(newCard.createCard());
})