import express from 'express';
import bodyParser from 'body-parser';  // Node.js body parsing middleware.
import { create } from 'express-handlebars';
import './db.js';

const app = express(); // Creates an app for your servers client

import alertsRouter from './routes/alerts.js';
import symbolsRouter from './routes/symbols.js';
import marketsRouter from './routes/markets.js';

// setup handlebars
const hbs = create({ extname: '.hbs' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

// Middleware to expose the app's shared templates to the client-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
  // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
  // templates which will be shared with the client-side of the app.
  hbs.getTemplates("views/partials/", {
    cache: app.enabled("view cache"),
    precompiled: true,
  }).then((templates) => {
    // RegExp to remove the ".handlebars" extension from the template names.
    const extRegex = new RegExp(hbs.extname + "$");

    // Creates an array of templates which are exposed via
    // `res.locals.templates`.
    templates = Object.keys(templates).map((name) => {
      return {
        name: name.replace(extRegex, ""),
        template: templates[name],
      };
    });

    // Exposes the templates during view rendering.
    if (templates.length) {
      res.locals.templates = templates;
    }

    setImmediate(next);
  })
    .catch(next);
}

// setup express client data handlers
app.use(bodyParser.json()); // Express modules / packages
app.use(bodyParser.urlencoded({ extended: true })); // Express modules / packages

// load the files that are in the public directory
app.use(express.static('public')); 

// routes
app.use(exposeTemplates);
app.use(alertsRouter);
app.use(symbolsRouter);
app.use(marketsRouter);

app.listen(3000, () => console.log('server started'));

export default app;
