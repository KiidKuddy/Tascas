import DatabaseConnnector from '../../../Database/database-connector.interface';

export default function listTascas(database: DatabaseConnnector) {
    return database.selectAll();
}