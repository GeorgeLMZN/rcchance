import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit = new CyrillicToTranslit();
import lodash from 'lodash';
import { createRoutes } from './routes.js';

// const ixRoutes = lodash.keyBy(parsed_routes, 'path');
const ixBreadcrumbs = {};

// for (let key in ixRoutes) {
//     const newKey = key.replace('/', '')
//     ixBreadcrumbs[newKey] = ixRoutes[key];
// }

const getBreadcrumbs = async (url) => {
    const router = createRoutes();

    var rtn = [{ name: "Главная", url: "/" }],
        acc = "",
        arr = url.substring(1).split("/");

    for (let i = 0; i < arr.length; i++) {
        acc = i != arr.length - 1 ? acc+"/"+arr[i] : null;
        const name = ixBreadcrumbs[arr[i]]?.name;
        if (name) {
            rtn[i+1] = { name: name, url: acc };
        } else {
            rtn[i+1] = { name: cyrillicToTranslit.reverse(arr[i]), url: acc };
        }
    }
    
    return rtn;
};

export { getBreadcrumbs };