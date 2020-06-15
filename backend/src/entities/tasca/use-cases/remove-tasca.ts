import DatabaseConnnector from '../../../Database/database-connector.interface';

export default function removeTasca(
    tascaId: string,
    database: DatabaseConnnector
) {
    return database.delete(tascaId);
}
