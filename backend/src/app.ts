import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { v4 } from 'uuid';

import { MONGODB_URI } from './utils/config';
import MongooseDatabaseConnector from './database/mongoose-database-connector';
import TascaController from './controllers/tasca.controller';
import HttpError from './errors/http.error';

class App {
    public readonly app: express.Application;
    public readonly mongooseDatabase: MongooseDatabaseConnector;

    private readonly tascaController: TascaController;
    private readonly fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './src/images');
        },
        filename: (req, file, cb) => {
            cb(null, v4() + ' - ' + file.originalname);
        }
    });
    private readonly fileFilter = (
        req: express.Request,
        file: any,
        cb: multer.FileFilterCallback
    ) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    public constructor() {
        this.app = express();
        try {
            this.mongooseDatabase = new MongooseDatabaseConnector(MONGODB_URI);
        } catch (error) {
            console.log(error);
            process.exit();
        }
        this.tascaController = new TascaController(this.mongooseDatabase);

        this.initiliazeMiddlewares();
        this.initiliazeRoutes();
        this.initializeErrorHandling();
    }

    private initiliazeMiddlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(
            multer({
                storage: this.fileStorage,
                fileFilter: this.fileFilter
            }).single('photo')
        );

        this.app.disable('x-powered-by');
        this.app.use((req, res, next) => {
            res.setHeader(
                'Access-Control-Allow-Origin',
                'http://localhost:4200'
            );
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE'
            );
            next();
        });
    }

    private initiliazeRoutes(): void {
        this.app.get('/api/get-tascas', this.tascaController.getTascas);
        this.app.get('/api/get-tasca/:id', this.tascaController.getTasca);
        this.app.get('/api/get-image/:tascaId', this.tascaController.getImage);
        this.app.post('/api/create-tasca', this.tascaController.postTasca);
        this.app.put('/api/edit-tasca/:id', this.tascaController.putTasca);
        this.app.delete(
            '/api/delete-tasca/:id',
            this.tascaController.deleteTasca
        );
    }

    private initializeErrorHandling(): void {
        this.app.use(
            (
                error: HttpError,
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                console.log(error.message);
                res.status(error.status).send({
                    status: error.status || 500,
                    error: error.message,
                    type: error.type,
                    instance: req.originalUrl
                });
            }
        );
    }
}

export default new App().app;
