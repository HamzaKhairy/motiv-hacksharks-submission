const express = require('express');
const path = require('path');
const cors = require('cors');

const models = require('./models/associations');

const userRoutes = require('./api/users/userRoutes');
const teamRoutes = require('./api/teams/teamRoutes');
const conversationRoutes = require('./api/conversations/conversationRoutes')
const calendarRoutes = require('./api/calendar/calendarRoutes');
const schoolRoutes = require('./api/schools/schoolRoutes');
const postRoutes = require('./api/posts/postRoutes');
const s3Routes = require('./api/s3/s3Routes');

const app = express();
const port = process.env.PORT || 8080;

const local = false;

app.use(express.json());
app.use(cors());


if (!local) {
  // Serve static files from the React app dist directory
  console.log(path.join(__dirname, 'web-app/dist'));
  app.use(express.static(path.join(__dirname, 'web-app/dist')));

  // Serve static files from the React app storybook-static directory
  console.log(path.join(__dirname, 'web-app/storybook-static'));
  app.use(express.static(path.join(__dirname, 'web-app/storybook-static')));

  // Handles storybook-static requests
  app.get('/storybook', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app/storybook-static', 'index.html'));
  });
}

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/conversations', conversationRoutes)
app.use('/api/calendar', calendarRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/files', s3Routes);

// Handles any requests that don't match the ones above
if (!local) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app/dist', 'index.html'));
  });
}

function printRoutes(list, routePrefix = '') {
  list.forEach(layer => {
      if (layer.route) {
          // Routes registered directly on the app
          const routes = layer.route;
          const route = {
              route: routePrefix + (routes.path === '/' ? '' : routes.path),
              method: Object.keys(routes.methods).map(method => method.toUpperCase())
          };
          console.log(`${route.method} ${route.route}`);
      } else if (layer.name === 'router' && layer.handle.stack) {
          // Router middleware registered with app.use
          let routerPath = layer.regexp.source.replace('^\\', '').replace('\\/?$', '').replace('(?=\\/|$)', '');
          if (routerPath === '') routerPath = '/';
          const newPrefix = routePrefix + routerPath;
          printRoutes(layer.handle.stack, newPrefix);
      }
  });
}

// Use this function to print all routes, including those in routers
printRoutes(app._router.stack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});