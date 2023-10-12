import { BlockName } from "./Block"
import { Tool, toolList } from "./Tool"

export interface Inventory{
    tools: Tool[]
    blocks: Partial<{[key in BlockName]: number}>
}

export const InventoryController = {
    getEquippedTool: (inventory: Inventory) => inventory.tools.find(t => t.equipped)
}

export const startingInventory :Inventory = {
    tools: [toolList[0].equip()],
    blocks: {dirt: 0}
}