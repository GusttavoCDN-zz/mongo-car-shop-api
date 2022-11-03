import express from 'express';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

import swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());

routes(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
