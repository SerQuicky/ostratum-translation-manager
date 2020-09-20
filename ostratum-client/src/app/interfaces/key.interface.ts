import { Check } from "./check.interface";

export interface Key {
    name: string,
    value: string,
    keys: Key[]
}