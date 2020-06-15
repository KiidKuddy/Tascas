import DatabaseConnnector from '../../../Database/database-connector.interface';

export default function listTasca(tascaId: string, database: DatabaseConnnector) {
    return database.selectById(tascaId);
}