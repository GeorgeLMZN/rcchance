const get_data_by_slug = async (slug) => {
    const data = await (await fetch(slug)).json();
    return data;
}