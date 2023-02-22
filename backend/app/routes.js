import { get_routes, get_subs } from './get_data.js';
import lodash from 'lodash';

const getRoutes = async () => {
    const res = await (await get_routes()).json();
    return res;
}

const getSubs = async () => {
    const res = await (await get_subs()).json();
    return res;
}

const createRoutes = async () => {
    const routes = await getRoutes();
    const subs = await getSubs();

    const flatten_routes = [],
        flatten_subs = [];

    const routes_final = [];

    for (let i = 0; i < routes.data.length; i++) {
        flatten_routes.push({
            id: routes.data[i].id,
            slug: routes.data[i].attributes.slug,
            name: routes.data[i].attributes.name,
            path: `/${routes.data[i].attributes.slug}`
        });
    }

    const ix_flatten_routes = lodash.keyBy(flatten_routes, 'slug');

    for (let i = 0; i < subs.data.length; i++) {
        const parent_slug = subs.data[i].attributes.kategorii_statej.data.attributes.slug;
        flatten_subs.push({
            parent_slug,
            parent_id: ix_flatten_routes[parent_slug]?.id,
            slug: subs.data[i].attributes.slug,
            name: subs.data[i].attributes.name,
            path: `/${subs.data[i].attributes.slug}`
        });
    }

    console.log(
        {
            routes: flatten_routes,
            sub_routes: lodash.groupBy(flatten_subs, 'parent_id')
        }
    );

    console.log(lodash.groupBy(flatten_subs, 'parent_id')[1])

    return {
        routes: flatten_routes,
        sub_routes: lodash.groupBy(flatten_subs, 'parent_id')
    }
}

export { createRoutes };