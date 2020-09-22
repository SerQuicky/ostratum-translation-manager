import { KeyValue } from "./key.value.interface";

export interface Key {
    name: string,
    values: KeyValue[],
    keys: Key[]
}