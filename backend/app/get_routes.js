import { get_routes, get_subs } from './get_data.js';
import lodash from 'lodash';

const baseRoutes = [
    {
        id: null,
        slug: 'about',
        name: 'О нас',
        path: `/`
    },
    {
        id: null,
        slug: 'contacts',
        name: 'Контакты',
        path: `/contacts`
    },
    {
        id: null,
        slug: 'price',
        name: 'Прайс',
        path: `/price`
    },
    {
        id: null,
        slug: 'news',
        name: 'Новости',
        path: `/news`
    },
];

/** Получить категории */
const getRoutes = async () => {
    const res = await (await get_routes()).json();
    return res;
}

/** Получить подкатегории */
const getSubs = async () => {
    const res = await (await get_subs()).json();
    return res;
}

/** Создаём роуты на категории и статьи в них */
const createRoutes = async () => {
    const resRoutes = await getRoutes(),
        resSubs = await getSubs();

    const routes = [...baseRoutes],
        subs = [];

    for (let i = 0; i < resRoutes.data.length; i++) {
        routes.push({
            id: resRoutes.data[i].id,
            slug: resRoutes.data[i].attributes.slug,
            name: resRoutes.data[i].attributes.name,
            path: `/article/${resRoutes.data[i].attributes.slug}`
        });
    }

    const ix_routes = lodash.keyBy(routes, 'slug');

    for (let i = 0; i < resSubs.data.length; i++) {
        const parent_slug = resSubs.data[i].attributes.kategorii_statej.data.attributes.slug;
        subs.push({
            parent_slug,
            parent_id: ix_routes[parent_slug]?.id,
            slug: resSubs.data[i].attributes.slug,
            name: resSubs.data[i].attributes.name,
            path: `/${resSubs.data[i].attributes.slug}`
        });
    }

    return {
        routes,
        subs,
    }
}

export { createRoutes };