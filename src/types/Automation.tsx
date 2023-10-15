import { Inventory } from "./Inventory"
import { Item } from "./Item"

export interface AutomationResolvable{
    name: AutomationName
    count: number
    power?: number
}

interface IAutomation{
    getElement: () => JSX.Element
}

export class Automation implements Item, AutomationResolvable{
    static id: string
    name: AutomationName
    power: number
    count: number

    constructor(name: AutomationName, power: number){
        this.name = name
        this.power = power
        this.count = 0
    }

    addCount = (count :number) => {
        this.count += count
        return this
    }

    addToInv(inv: Inventory, count = 1){
        if(!inv.automations[this.name]?.addCount(count)){
            inv.automations[this.name] = this.addCount(count)
        }
        return this
    }

    getTexture = () => `/automations/${this.name}/icon.png`
}

export class Slave extends Automation implements IAutomation{
    static readonly id: AutomationName = "slave"

    constructor(){
        super(Slave.id, 1)
    }

    getElement(){
        return <></>
    }
}

export class CreeperSpawner extends Automation implements IAutomation{
    static readonly id = "creeper_spawner"

    constructor(power?: number){
        super(CreeperSpawner.id, power ?? 1)
    }

    getElement = () => <></>
}

export const AutomationList = {
    slave: Slave,
    creeper_spawner: CreeperSpawner,
}

export type AutomationName = keyof typeof AutomationList 