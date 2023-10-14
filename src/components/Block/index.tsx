import { useEffect, useRef, useState } from 'react'
import './style.css'
import { Block, BlockName } from '../../types/Block'
import { Inventory, InventoryController } from '../../types/Inventory'
import { Tool, Tools } from '../../types/Tool'
import { Stats } from '../../types/Stats'

interface Props{
    setInventory: React.Dispatch<React.SetStateAction<Inventory>>
    setCurrentBlock: React.Dispatch<React.SetStateAction<Block>>
    currentBlock: Block
    inventory: Inventory
    setStats: React.Dispatch<React.SetStateAction<Stats>>
}

export default function BlockElement({currentBlock, setInventory, inventory, setCurrentBlock, setStats}: Props) {
    const blockRef = useRef<HTMLImageElement>(null)
    const blockDropsRef = useRef<HTMLImageElement>(null)
    const destroyStageImage = useRef<string>("")
    const toolRef = useRef<HTMLImageElement>(null)
    const [equippedTool, setEquippedTool] = useState<Tool>(InventoryController.getEquippedTool(inventory))

    const [destroyStage, setDestroyStage] = useState(0)

    function destory(amount: number){
        const d = destroyStage + amount
        const minedAmount = Math.floor(d/currentBlock.hardness)
        const dLeft = d % currentBlock.hardness

        const hardnessOutOfTen = Math.floor(dLeft/currentBlock.hardness*10)
        destroyStageImage.current = "/destroy/"+(hardnessOutOfTen-1 >= 0 ? hardnessOutOfTen-1 : 0)+".png"

        if(minedAmount > 0){
            setInventory(i => ({...i, blocks: {...i.blocks, [currentBlock.name]: ((i.blocks[currentBlock.name] ?? 0) + minedAmount)}}))
            setStats(s => ({...s, mined_blocks: s.mined_blocks + minedAmount}))

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
        const animation = equippedTool.types[0]?.animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            }
        ], {duration: 100, fill: "forwards"})

        toolRef.current?.animate(animation[0], animation[2])
    }

    function handleMouseUp(){
        const animation = equippedTool.types[0]?.animation

        blockRef.current?.animate([
            {
                transform: "scale(.8)"
            },
            {
                transform: "scale(1)"
            }
        ], {duration: 100, fill: "forwards"})

        if(animation) toolRef.current?.animate(animation[1], animation[2])
        destory(equippedTool.getSpeedOn(currentBlock))
    }

    useEffect(() => {
        equipTool(InventoryController.getEquippedTool(inventory))
    }, [inventory.tools])

    function equipTool(tool: Tool){
        tool.equip()
        setEquippedTool(tool)
        const animation = tool.types[0]?.animation
        if(animation) toolRef.current?.animate(animation[1], {duration:0, fill: "forwards"})
    }

    function handleDrop(e: React.DragEvent){
        const data = e.dataTransfer.getData("text")
        const [type, value] = data.split(':')

        switch (type.toLowerCase()) {
            case "block":
                if(value != currentBlock.name){
                    setDestroyStage(0)
                    setCurrentBlock(curr => Block.find(value as BlockName) ?? curr)
                }
                break;

            case "tool":
                equipTool(Tools[value as keyof typeof Tools])
                break

            default:
                break;
        }
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
                <img src={equippedTool.getTexture()} ref={toolRef} id='block-tool'/>
            </div>
        </div>
        </>
    )
}