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

function createCard(name, link) {
    const elementCard = templateCard.cloneNode(true);
    elementCard.querySelector('.element__heading').innerText = name;
    elementCard.querySelector('.element__image').setAttribute('src', link);
    elementCard.querySelector('.element__image').setAttribute('alt', 'Карточка по умолчанию');
    setEventListeners(elementCard);
    elements.prepend(elementCard);
}
initialCards.forEach((item) => { // загрузить стартовые карточки из списка
    createCard(item.name, item.link);
})