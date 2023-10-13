import { useEffect, useRef, useState } from 'react'
import './style.css'
import { Block, Blocs } from '../../types/Block'
import { Inventory, InventoryController } from '../../types/Inventory'

interface Props{
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
    setCurrentBlock: React.Dispatch<React.SetStateAction<Block>>
    currentBlock: Block
    inventory: Inventory
}

export default function BlockElement({currentBlock, setInventory, inventory, setCurrentBlock}: Props) {
    const blockRef = useRef<HTMLImageElement>(null)
    const blockDropsRef = useRef<HTMLImageElement>(null)
    const destroyStageImage = useRef<string>("")
    const toolRef = useRef<HTMLImageElement>(null)

    const [destroyStage, setDestroyStage] = useState(0)

    function destory(amount: number){
        const d = destroyStage + amount
        const minedAmount = Math.floor(d/currentBlock.hardness)
        const dLeft = d % currentBlock.hardness

        destroyStageImage.current = "/destroy/"+(Math.floor(dLeft/currentBlock.hardness*10-1))+".png"

        if(minedAmount > 0){
            setInventory(i => ({...i, blocks: {...i.blocks, [currentBlock.name]: ((i.blocks[currentBlock.name] ?? 0) + minedAmount)}}))
            
            const Xrange = 12
            const animDuration = 2000

            const blockDrops = new Array(minedAmount).fill(null).map(() =>{
                const blockDrop = document.createElement("img")
                blockDropsRef.current?.appendChild(blockDrop)
                blockDrop.classList.add("blockdrop")
                blockDrop.src = currentBlock.getTexture()
    
                blockDrop.animate([
                    {transform: `translateX(${Math.random() * Xrange - Xrange/2}em) translateY(5em)`},
                    {transform: `translateX(${Math.random() * Xrange*2 - Xrange}em) translateY(100vh) rotate(${Math.random() * 720 * (Math.random() >= 0.5 ? -1 : 1)}deg)`}
                ], {duration: animDuration, fill: "forwards"})

                return blockDrop
            })

            setTimeout(() => {
                blockDrops.forEach(b => b.remove())
            }, animDuration)
        }

        setDestroyStage(dLeft)
    }

    function handleMouseDown(){
        const tool = InventoryController.getEquippedTool(inventory)
        const animation = tool.types[0].animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            }
        ], {duration: 100, fill: "forwards"})

        toolRef.current?.animate(animation[0], animation[2])
    }

    function handleMouseUp(){
        const tool = InventoryController.getEquippedTool(inventory)
        const animation = tool.types[0].animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            },
            {
                transform: "scale(1)"
            }
        ], {duration: 100, fill: "forwards"})

        toolRef.current?.animate(animation[1], animation[2])
        destory(tool.getSpeedOn(currentBlock))
    }

    useEffect(() => {
        const tool = InventoryController.getEquippedTool(inventory)
        const animation = tool.types[0].animation
        toolRef.current?.animate(animation[1], {duration:0, fill: "forwards"})
    }, [inventory, inventory.tools])

    function handleDrop(e: React.DragEvent){
        const blockName = e.dataTransfer.getData("text")
        setCurrentBlock(curr => Blocs.find(b => b.name == blockName) ?? curr)
    }

    return (
        <>
        <div id='block-container' ref={blockDropsRef}>
            <div id='block' ref={blockRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {
                    (destroyStage/currentBlock.hardness*10-1 >= 0) ?
                    <>
                    <img className='destroy-stages' src={destroyStageImage.current}/>
                    <img className='destroy-stages' src={destroyStageImage.current}/>
                    <img className='destroy-stages' src={destroyStageImage.current}/>
                    </>
                    : ""
                }
                <img 
                    id='block-main' 
                    draggable={false} 
                    onMouseDown={handleMouseDown} 
                    onMouseUp={handleMouseUp} 
                    src={currentBlock.getTexture()} 
                    alt={currentBlock.name}
                />
                <img src={InventoryController.getEquippedTool(inventory).getTexture()} ref={toolRef} id='block-tool'/>
            </div>
        </div>
        </>
    )
}