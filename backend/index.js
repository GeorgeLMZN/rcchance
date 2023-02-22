import express from 'express';
import bodyparser from 'body-parser';
import * as url from 'url';
import { createRoutes } from './app/routes.js';
import { getBreadcrumbs } from './app/breadcrumbs.js';
import { get_main, get_news_preview, get_news_single, get_articles } from './app/get_data.js';

const port = 3000;
const app = express();
const partials = {
    header: 'header.ejs',
    footer: 'footer.ejs',
};
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const cms_url = 'http://localhost:1337';

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/public', express.static(__dirname + '/public'));

const server = async () => {
    const routes = await createRoutes();

    app.get('/', async (req, res) => {
        const data = await (await get_main()).json();
    
        res.render('main.ejs', {
            partials,
            routes,
            // breadcrumbs: req.breadcrumbs,
            content: data.data.attributes,
            cms_url: cms_url,
        })
    });
    
    app.get('/conacts', (req, res, next) => {
        req.breadcrumbs = getBreadcrumbs(req.originalUrl);
    
        res.render('contacts.ejs', {
            partials: partials,
            routes,
            // breadcrumbs: req.breadcrumbs,
            cms_url: cms_url,
        });
    
        next();
    });
    
    app.get('price', (req, res) => {
        // req.breadcrumbs = getBreadcrumbs(req.originalUrl);
    
        res.render('price.ejs', {
            partials: partials,
            routes,
            // breadcrumbs: req.breadcrumbs,
            cms_url: cms_url,
        });
    
        next();
    });
    
    app.get(`news/:slug?`, async (req, res, next) => {
        // req.breadcrumbs = getBreadcrumbs(req.originalUrl);
        let template = '';
        let data = [];
    
        if (req.params.slug) {
            const res = await (await get_news_single(req.params.slug)).json();
    
            data = {
                slug: res.data.attributes.slug,
                article_preview_image: res.data.attributes.article_preview_image.data.attributes.url,
                article_heading: res.data.attributes.article_heading,
                article_block: res.data.attributes.article_block,
                cms_url: cms_url,        
            }
    
            template = 'article.ejs';
        } else {
            const res = await (await get_news_preview()).json();
    
            for (let i = 0; i < res.data.length; i++) {
                data.push({
                    slug: res.data[i].attributes.slug,
                    article_preview_text: res.data[i].attributes.article_preview_text,
                    article_preview_image: res.data[i].attributes.article_preview_image.data.attributes.url,
                    article_heading: res.data[i].attributes.article_heading,
                    cms_url: cms_url,
                })
            }
    
            template = 'news.ejs';
        }
    
        res.render(template, {
            partials: partials,
            routes,
            // breadcrumbs: req.breadcrumbs,
            content: data,
            cms_url: cms_url,
        });
    
        next();
    });
    
    app.get('/:slug/:slug2?', async (req, res, next) => {
        // req.breadcrumbs = getBreadcrumbs(req.originalUrl);
    
        res.render('article.ejs', {
            partials: partials,
            routes,
            // breadcrumbs: req.breadcrumbs,
            cms_url: cms_url,
        });
    
        next();
    });
    
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
}

server();


{/* <section class="breadcrumbs">
<div class="container py-0">
    <ul class="breadcrumbs-list">
        <% for(var i=0; i < breadcrumbs.length; i++) {%>
            <li class="breadcrumb">
                <a href="<%- breadcrumbs[i].url %>" class=""><%= breadcrumbs[i].name %></a>
            </li>
        <% } %>
    </ul>
</div>
</section> */}
