import express from 'express';
import bodyparser from 'body-parser';
import * as url from 'url';
import { routes, parsed_routes } from './app/routes.js';
import { get_breadcrumbs } from './app/breadcrumbs.js';

const port = 3000;
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const partials = {
    header: 'header.ejs',
    footer: 'footer.ejs',
};

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/public', express.static(__dirname + '/public'));

app.get(routes.main.path, (req, res) => {
    res.render('main.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    })
});

app.get(routes.contacts.path, (req, res, next) => {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);

    res.render('contacts.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    });

    next();
});

app.get(routes.price.path, (req, res) => {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);

    res.render('price.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    });

    next();
});

app.get(routes.news.path, async (req, res, next) => {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);

    res.render('news.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    });

    next();
});

app.get(`${routes.news.path}/:slug?`, async (req, res, next) => {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);

    res.render('article.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    });

    next();
});

app.get('/:slug/:slug2?', async (req, res, next) => {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);

    res.render('article.ejs', {
        partials: partials,
        routes: parsed_routes,
        breadcrumbs: req.breadcrumbs,
    });

    next();
});

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
