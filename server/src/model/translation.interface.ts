import { Language } from "./language.interface";
import { TranslationProject } from "./translationProject.interface";

export interface Translation {
    id: number,
    fileName: string,
    file: any,
    type: string,
    language: Language,
    project: TranslationProject
}