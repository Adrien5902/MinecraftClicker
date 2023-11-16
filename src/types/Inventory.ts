import { Automation, AutomationList, AutomationName, AutomationResolvable } from "./Automation"
import { BlockList, BlockName } from "./Block"
import { Tool, ToolResolvable, Tools } from "./Tool"
import { Upgrade } from "./Upgrade"

export interface Inventory{
    tools: Tool[]
    blocks: Partial<{[key in BlockName]: number}>
    upgrades: Upgrade[]
    automations: Automation[]
    coins: number
}

export interface InventoryResolvable{
    tools: ToolResolvable[]
    blocks: Partial<{[key in BlockName]: number}>
    upgrades: Upgrade[]
    coins: number
    automations: AutomationResolvable[]
}

export const InventoryController = {
    getEquippedTool: (inventory: Inventory) => inventory.tools.find(t => t.equipped) as Tool,
    resolve: (inventory: InventoryResolvable) => {
        return {
            ...inventory,
            automations: inventory.automations.map((a) => {
                return new AutomationList[a.name](a?.power).addCount(a.count)
            }),
            tools: inventory.tools.map(t => t.equipped ? Tools[t.name].equip() : Tools[t.name]),
        } as Inventory
    },
    parse: (inventory: Inventory) => {
        return {
            ...inventory,
            tools: inventory.tools.map(t => ({name: t.name, equipped: t.equipped}))
        } as InventoryResolvable
    }
}

export const startingInventory :Inventory = {
    tools: [...Object.values(Tools), Tools.hand.equip()],
    blocks: Object.keys(BlockList).reduce((prev, curr) => ({...prev, [curr]: 0}), {}),
    upgrades: [],
    coins: 10e15,
    automations: []
}