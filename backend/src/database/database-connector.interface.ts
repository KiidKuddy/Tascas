import Tasca from "../entities/tasca/tasca.model";

export default interface DatabaseConnnector {
    selectAll(): Promise<any>;
    selectById(id: number | string): Promise<any>;
    insert(tasca: Tasca): Promise<any>;
    update(id:number | string, tasca: Tasca): Promise<any>;
    delete(id: number | string): Promise<any>;
}