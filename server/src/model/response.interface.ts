export interface ServerResponse<T> {
    code: number,
    title: string,
    message: string,
    result: T[]
}