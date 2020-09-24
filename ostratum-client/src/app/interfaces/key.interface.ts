import { KeyValue } from "./key.value.interface";

export interface Key {
    id: string,
    name: string,
    values: KeyValue[],
    holder: boolean,
    keys: Key[]
}