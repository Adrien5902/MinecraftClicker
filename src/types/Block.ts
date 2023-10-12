export type BlockName = "dirt" | "grass" | "wood" | "stone"

export class Block{
    name: BlockName

    constructor(name: BlockName){
        this.name = name
    }

    getTexture = () => "/" + this.name + ".png"
}

export type BlockInventory = {block: Block, count: number}[]