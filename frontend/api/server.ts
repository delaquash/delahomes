import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import orderRoutes from './route/OrderRoutes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // Use order routes
  server.use('/api', orderRoutes);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
    
  });

  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
