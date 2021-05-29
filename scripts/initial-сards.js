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
    elementCardHeading.innerText = name;
    elementCardImage.setAttribute('src', link);
    elementCardImage.setAttribute('alt', 'Карточка по умолчанию');
    const elementCard = templateCard.cloneNode(true);
    setEventListeners(elementCard);
    elements.prepend(elementCard);
}
initialCards.forEach((item) => { // загрузить стартовые карточки из списка
    createCard(item.name, item.link);
})