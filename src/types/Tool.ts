export class Tool{
    name: string
    multiplier?: number
    speed?: number
    equipped: boolean
    
    constructor(name: string, speed?: number, multiplier?: number){
        this.name = name
        this.speed = speed ?? 1
        this.multiplier = multiplier ?? 1
        this.equipped = false
    }

    equip(tools?: Tool[]){
        tools?.forEach(t => t.equipped = false)
        this.equipped = true
        return this
    }
}

export const toolList = [
    new Tool("wooden-pickaxe")
]