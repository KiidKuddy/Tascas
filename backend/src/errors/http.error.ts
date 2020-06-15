export default class HttpError extends Error {
    public status: number;
    public message: string;
    public type: string;

    constructor(status: number, message: string, type?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.type = type || 'Http Error';
    }
}
