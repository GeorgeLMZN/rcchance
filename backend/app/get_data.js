const API_KEY = 'e02749f719d396fe1de92700c230b04053a59df35194fc7de928ff91e250b5b9ebf7af302d3e4f1e45669a80ea93b0bbb85059bb7e3f50a2e423e7064301b9e39dd02b939b2b4fc1c9c5c52cd3682515636ee590d5f2a2bcdb92899877b5fe074698b2a497dab960f09828a04a397030075f40fab2623d06c59d73ea36f1eec7';
const BASE_URL = 'http://localhost:1337';

const get_main = async () => {
    const data = await fetch(`${BASE_URL}/api/main?populate=deep,10`);
    return data;
}

const get_news_preview = async () => {
    const data = await fetch(`${BASE_URL}/api/novostis?populate=deep,10`);
    return data;
}

const get_news_single = async (slug) => {
    const data = await fetch(`${BASE_URL}/api/novostis/${slug}?populate=deep,10`);
    return data;
}

const get_routes = async () => {
    const data = await fetch(`${BASE_URL}/api/kategorii-statejs?fields[0]=slug&fields[1]=name`);
    return data;
}

const get_subs = async () => {
    const data = await fetch(`${BASE_URL}/api/statis?fields[0]=slug&fields[1]=name&populate=kategorii_statej`);
    return data;
}

const get_articles = async () => {
    const data = await fetch(`${BASE_URL}/api/statis?populate=deep,10`);
    return data;
}

export { get_main, get_news_preview, get_news_single, get_routes, get_subs, get_articles };
