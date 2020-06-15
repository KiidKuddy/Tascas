import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import DatabaseConnnector from '../Database/database-connector.interface';
import addTasca from '../entities/tasca/use-cases/add-tasca';
import listTascas from '../entities/tasca/use-cases/list-tascas';
import listTasca from '../entities/tasca/use-cases/list-tasca';
import Tasca from '../entities/tasca/tasca.model';
import NotFoundError from '../errors/not-found.error';
import editTasca from '../entities/tasca/use-cases/edit-tasca';
import removeTasca from '../entities/tasca/use-cases/remove-tasca';

export default class TascaController {
    private readonly database: DatabaseConnnector;

    public constructor(database: DatabaseConnnector) {
        this.database = database;
    }

    public getTascas = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const tascas: Tasca[] = await listTascas(this.database);
            res.json(tascas);
        } catch (error) {
            next(error);
        }
    };

    public getTasca = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.params.id) {
                throw new NotFoundError('The tasca id is not valid.');
            }
            const tasca: Tasca = await listTasca(req.params.id, this.database);
            if (!tasca) {
                throw new NotFoundError('The tasca id is not valid.');
            }
            res.json(tasca);
        } catch (error) {
            next(error);
        }
    };

    public getImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.params.tascaId) {
                throw new NotFoundError('The tasca id is not valid.');
            }
            const tasca: Tasca = await this.database.selectById(
                req.params.tascaId
            );
            if (!tasca) {
                res.sendFile(path.resolve(__dirname, `../images/${tasca.photo}`));
            }
            else{
                res.json('No image found.');
            }
        } catch (error) {
            next(error);
        }
    };

    public postTasca = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let photo: string;
            if (req.file) {
                photo = req.file.filename;
            }
            console.log(photo);

            await addTasca(
                req.body.name,
                req.body.address,
                req.body.rating,
                photo,
                this.database
            );
            res.status(201).json('Tasca created successfully.');
        } catch (error) {
            if (req.file) {
                fs.unlink(req.file.path, () => {});
            }
            next(error);
        }
    };

    public putTasca = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.params.id) {
                throw new NotFoundError('The tasca id is not valid.');
            }

            const oldTasca: Tasca = await listTasca(
                req.params.id,
                this.database
            );
            if (!oldTasca) {
                throw new NotFoundError('The tasca id is not valid.');
            }

            let photo: string = oldTasca.photo;
            if (req.file) {
                fs.unlink(`src/images/${oldTasca.photo}`, () => {});
                photo = req.file.filename;
            }

            const newTasca = new Tasca(
                req.body.name,
                req.body.address,
                req.body.rating,
                photo
            );
            await editTasca(req.params.id, newTasca, this.database);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    public deleteTasca = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.params.id) {
                throw new NotFoundError('The tasca id is not valid.');
            }

            const tasca: Tasca = await listTasca(req.params.id, this.database);
            if (!tasca) {
                throw new NotFoundError('The tasca id is not valid.');
            }

            const photo = tasca.photo;
            await removeTasca(req.params.id, this.database);
            fs.unlink(`src/images/${photo}`, () => {
                res.status(204).send();
            });
        } catch (error) {
            next(error);
        }
    };
}
