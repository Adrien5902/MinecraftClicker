//{BlockName : [Hardness]}
export const BlockList = {
    dirt: [10],
    grass: [20],
}

export type BlockName = keyof typeof BlockList

export class Block{
    name: BlockName
    hardness: number

    constructor(name: BlockName, hardness: number){
        this.name = name
        this.hardness = hardness
    }

    getTexture = () => "/blocks/" + this.name + ".png"
}

export type BlockInventory = {block: Block, count: number}[]

//@ts-ignore
export const Blocs = (Object.keys(BlockList) as BlockName[]).map(name => new Block(name, ...BlockList[name]))