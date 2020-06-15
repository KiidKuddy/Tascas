import Tasca from '../tasca.model';
import DatabaseConnnector from '../../../Database/database-connector.interface';

export default function addTasca(
    name: string,
    address: string,
    rating: number,
    photo: string,
    database: DatabaseConnnector
) {
    const tasca = new Tasca(name, address, rating, photo);
    return database.insert(tasca);
}
