import { Item } from "./Item";

export class Upgrade implements Item{
    name: string;

    constructor(name: string){
        this.name = name
    }

    getTexture = () => `/upgrades/${this.name}.png`
}