import Tasca from '../tasca.model';
import DatabaseConnnector from '../../../Database/database-connector.interface';

export default async function editTasca(
    tascaId: string,
    newTasca: Tasca,
    database: DatabaseConnnector
) {
    return database.update(tascaId, newTasca);
}
