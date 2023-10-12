import { Tool, toolList } from "./Tool"

export interface Inventory{
    tools: Tool[]
}

export const InventoryController = {
    getEquippedTool: (inventory: Inventory) => inventory.tools.find(t => t.equipped)
}

export const startingInventory :Inventory = {
    tools: [toolList[0].equip()]
}