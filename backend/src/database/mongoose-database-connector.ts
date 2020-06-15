import * as mongoose from 'mongoose';
import DatabaseConnector from './database-connector.interface';
import Tasca from '../entities/tasca/tasca.model';
import TascaSchema from './mongoose/tasca.schema';

export default class MongooseDatabaseConnector implements DatabaseConnector {
    public constructor(uri: string) {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }

    public async selectAll(): Promise<any> {
        return await TascaSchema.find();
    }

    public async selectById(id: string | number): Promise<any> {
        return await TascaSchema.findById(id);
    }

    public async insert(tasca: Tasca): Promise<any> {
        const newTasca = new TascaSchema({
            name: tasca.name,
            address: tasca.address,
            rating: tasca.rating,
            photo: tasca.photo
        });
        return await newTasca.save();
    }

    public async update(id: number | string, tasca: Tasca): Promise<any> {
        return await TascaSchema.findByIdAndUpdate(id, tasca);
    }

    public async delete(id: number | string): Promise<any> {
        return await TascaSchema.findByIdAndDelete(id);
    }
}
