import { useEffect, useState } from 'react'
import './style.css'
import { Block, BlockName } from '../../types/Block'
import { Inventory, startingInventory } from '../../types/Inventory'

function App() {
    const [inventory, setInventory] = useState<Inventory>()
    const [currentBlock, setCurrentBlock] = useState<Block>(new Block("dirt"))

    useEffect(() => {
        const invstorage = window.localStorage.getItem("inventory")
        setInventory(invstorage ? (JSON.parse(invstorage) as Inventory) : startingInventory)
        setCurrentBlock(new Block(window.localStorage.getItem("current-block") as BlockName) ?? new Block("dirt"))
    })

    return (
        <>
        </>
    )
}

export default App
