import express from "express";
import bodyparser from "body-parser";
import * as url from "url";
import lodash from "lodash";
import { createRoutes } from "./app/get_routes.js";
import { getBreadcrumbs } from "./app/breadcrumbs.js";
import {
  get_main,
  get_news_preview,
  get_news_single,
  get_articles,
  get_articles_cat,
  get_contact,
} from "./app/get_data.js";

const port = 3000;
const app = express();
const partials = {
  header: "header.ejs",
  footer: "footer.ejs",
};
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const cms_url = "http://localhost:1337";

const server = async () => {
  const routes = await createRoutes();
  const routesMain = routes.routes;
  const ixRoutesSub = lodash.groupBy(routes.subs, "parent_id");

  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
  app.use("/public", express.static(__dirname + "/public"));

  /** Главная */
  app.get("/", async (req, res, error) => {
    const data = await (await get_main()).json();

    res.render("main.ejs", {
      partials,
      routes: routesMain,
      routes_sub: ixRoutesSub,
      content: data.data.attributes,
      cms_url: cms_url,
      breadcrumbs: req.breadcrumbs,
    });
  });

  /** Контакты */
  app.get("/contacts", async (req, res, next) => {
    req.breadcrumbs = await getBreadcrumbs(req.originalUrl, routes);

    const apiResponse = await (await get_contact()).json();

    const content = apiResponse.data.attributes;

    console.log(content);

    res.render("contacts.ejs", {
      partials,
      cms_url,
      content,
      routes: routesMain,
      routes_sub: ixRoutesSub,
      breadcrumbs: req.breadcrumbs,
    });

    next();
  });

  /** Прайс */
  app.get("/price", async (req, res, next) => {
    req.breadcrumbs = await getBreadcrumbs(req.originalUrl, routes);

    res.render("price.ejs", {
      partials,
      cms_url,
      routes: routesMain,
      routes_sub: ixRoutesSub,
      breadcrumbs: req.breadcrumbs,
    });

    next();
  });

  /** Новости */
  app.get(`/news/:slug?`, async (req, res, next) => {
    req.breadcrumbs = await getBreadcrumbs(req.originalUrl, routes);

    let template = "";
    let data = [];

    if (req.params.slug) {
      const res = await (await get_news_single(req.params.slug)).json();

      data = {
        slug: res.data.attributes.slug,
        article_preview_image: res.data.attributes.article_preview_image,
        article_heading: res.data.attributes.article_heading,
        article_block: res.data.attributes.article_block,
      };

      template = "article.ejs";
    } else {
      const res = await (await get_news_preview()).json();

      for (let i = 0; i < res.data.length; i++) {
        data.push({
          slug: res.data[i].attributes.slug,
          article_preview_text: res.data[i].attributes.article_preview_text,
          article_preview_image:
            res.data[i].attributes.article_preview_image.data.attributes.url,
          article_heading: res.data[i].attributes.article_heading,
        });
      }

      template = "news.ejs";
    }

    res.render(template, {
      partials,
      cms_url,
      routes: routesMain,
      routes_sub: ixRoutesSub,
      content: data,
      breadcrumbs: req.breadcrumbs,
    });

    next();
  });

  /** Статьи */
  app.get("/article/:slug/:slug2?", async (req, res, next) => {
    req.breadcrumbs = await getBreadcrumbs(req.originalUrl, routes);

    console.log(req.breadcrumbs);

    let apiResponse,
      template = "article.ejs";

    if (req.params.slug2) {
      apiResponse = await (await get_articles(req.params.slug2)).json();
    } else {
      apiResponse = await (await get_articles_cat(req.params.slug)).json();
    }

    const content = apiResponse.data?.attributes;

    if (!content) template = "404.ejs";

    res.render(template, {
      partials,
      content,
      cms_url,
      routes: routesMain,
      routes_sub: ixRoutesSub,
      breadcrumbs: req.breadcrumbs,
    });

    next();
  });

//   app.use((error, req, res, next) => {
//     next(console.log("О нет кажется мы ошиблись"));
//   });

  app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
  });
};

server();
