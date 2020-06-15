import ValidationError from '../../errors/validation.error';

export default class Tasca {
    readonly name: string;
    readonly address: string;
    readonly rating: number;
    readonly photo: string;

    public constructor(name:string, address: string, rating: number, photo?: string) {
        if (!name || name.trim().length === 0) {
            throw new ValidationError('A Tasca must have a name.');
        }
        if (!address || address.trim().length === 0) {
            throw new ValidationError('A Tasca must have an address.');
        }
        if (!rating || rating < 1 || rating > 10) {
            throw new ValidationError("The tasca's rating bust be between 1 and 10.");
        }
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.photo = photo;
    }
}