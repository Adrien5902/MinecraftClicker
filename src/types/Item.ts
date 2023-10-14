import { ObjectClass } from "./MapObjectClass"

export interface Item extends ObjectClass{
    name: string
    getTexture: () => string
}