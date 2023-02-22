const BASE_URL = "http://localhost:1337";

const get_main = async () => {
  const data = await fetch(`${BASE_URL}/api/main?populate=deep,10`);
  return data;
};

const get_news_preview = async () => {
  const data = await fetch(`${BASE_URL}/api/novostis?populate=deep,10`);
  return data;
};

const get_news_single = async (slug) => {
  const data = await fetch(`${BASE_URL}/api/novostis/${slug}?populate=deep,10`);
  return data;
};

const get_news_single_name = async (slug) => {
  const data = await fetch(`${BASE_URL}/api/novostis/${slug}?fields[0]=name`);
  return data;
};

const get_routes = async () => {
  const data = await fetch(
    `${BASE_URL}/api/kategorii-statejs?fields[0]=slug&fields[1]=name`
  );
  return data;
};

const get_subs = async () => {
  const data = await fetch(
    `${BASE_URL}/api/statis?fields[0]=slug&fields[1]=name&populate=kategorii_statej`
  );
  return data;
};

const get_articles = async (slug) => {
  const data = await fetch(`${BASE_URL}/api/statis/${slug}?populate=deep,10`);
  return data;
};

const get_articles_cat = async (slug) => {
  const data = await fetch(
    `${BASE_URL}/api/kategorii-statejs/${slug}?populate=deep,10`
  );
  return data;
};

const get_contact = async () => {
    const data = await fetch(
        `${BASE_URL}/api/contact?populate=deep,10`
    );
    return data;
}

export {
  get_main,
  get_news_preview,
  get_news_single,
  get_routes,
  get_subs,
  get_articles,
  get_articles_cat,
  get_news_single_name,
  get_contact
};
