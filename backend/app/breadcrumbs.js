import lodash from 'lodash';
import { get_news_single_name } from './get_data.js';

const getBreadcrumbs = async (url, routes) => {
    const ixRoutes = lodash.keyBy(routes.routes, 'slug'),
        ixSubs = lodash.keyBy(routes.subs, 'slug');

    let rtn = [{ name: "Главная", url: "/" }],
        acc = "",
        arr = url.substring(1).split("/");

    for (let i = 0; i < arr.length; i++) {

        acc = i != arr.length - 1 ? acc+"/"+arr[i] : null;

        const name = ixRoutes[arr[i]]?.name || ixSubs[arr[i]]?.name;

        if (name) {
            rtn[i+1] = { name: name, url: acc };
        } else {
            const singleNews = await (await get_news_single_name(arr[i])).json();

            singleNews.data ? rtn[i+1] = { name: singleNews.data.attributes.name, url: acc } : null;
        }
    }

    return lodash.compact(rtn);
};

export { getBreadcrumbs };