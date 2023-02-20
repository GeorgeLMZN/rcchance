import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new CyrillicToTranslit();

const routes = {
    main: {
        id: 1,
        path: '/',
        name: 'О клинике',
    },
    post_alco: {
        id: 2,
        name: 'Лечение акоголизма',
        path: `/${cyrillicToTranslit.transform('Лечение акоголизма', '-').toLowerCase()}`,
    },
    post_therapy: {
        id: 3,
        name: 'Терапевтическое отделение',
        path: `/${cyrillicToTranslit.transform('Терапевтическое отделение', '-').toLowerCase()}`,
    },
    post_psycho: {
        id: 4,
        name: 'Лечение психических расстройств',
        path: `/${cyrillicToTranslit.transform('Лечение психических расстройств', '-').toLowerCase()}`,
    },
    price: {
        id: 5,
        path: '/price',
        name: 'Прайс',
    },
    contacts: {
        id: 6,
        path: '/contacts',
        name: 'Контакты',
    },
    news: {
        id: 7,
        path: '/news',
        name: 'Новости'
    }
}

const parsed_routes = Object.values(routes);

export { routes, parsed_routes };