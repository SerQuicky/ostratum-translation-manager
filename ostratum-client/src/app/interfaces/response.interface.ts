export interface ServerResponse<T> {
    code: number,
    message: string,
    value?: T[]
}