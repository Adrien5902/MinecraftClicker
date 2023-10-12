import { useEffect, useState } from 'react'
import './style.css'
import { Block, Blocs } from '../../types/Block'
import { Inventory, startingInventory } from '../../types/Inventory'
import BlockElement from '../Block'
import InventoryElement from '../Inventory'

function App() {
    const [inventory, setInventory] = useState<Inventory>(startingInventory)
    const [currentBlock, setCurrentBlock] = useState<Block>(Blocs[1])

    useEffect(() => {
        const invstorage = window.localStorage.getItem("inventory")
        const blockstorage = window.localStorage.getItem("current-block")
        const foundBlockStorage = Blocs.findIndex(b => b.name == blockstorage)

        setInventory(invstorage ? (JSON.parse(invstorage) as Inventory) : startingInventory)
        setCurrentBlock(Blocs[foundBlockStorage > 0 ? foundBlockStorage : 0])
    }, [])

    return (
        <>
            <BlockElement currentBlock={currentBlock} setInventory={setInventory}></BlockElement>
            <InventoryElement inventory={inventory}/>
        </>
    )
}

export default App
