import { Language } from "./language.interface";

export interface Translation {
    id: number,
    fileName: string,
    file: string,
    type: string,
    date: number,
    language: Language,
    project: number
}