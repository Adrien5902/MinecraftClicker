import { DestroyContext } from "../../components/Block";
import { Inventory } from "../Inventory"
import { Item } from "../Item"
import { Tool } from "../Tool"
import './style.css'
import { useContext, useEffect } from 'react';


export interface AutomationResolvable{
    name: AutomationName
    count: number
    power?: number
    speed: number
}

export interface IAutomation extends AutomationResolvable{
    getElement: (tool: Tool) => JSX.Element
}

export class Automation implements Item, AutomationResolvable{
    static id: string
    name: AutomationName
    power: number
    count: number
    speed: number
    interval?: number

    constructor(name: AutomationName, speed: number, power: number){
        this.name = name
        this.power = power
        this.count = 0
        this.speed = speed
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
        super(Slave.id, 1, 1)
    }

    getElement(tool: Tool){
        const blockradius = 10

        const toolAnimation = tool.types[0].animation

        const destroy = useContext(DestroyContext)

        useEffect(() => {
            document.getElementById("automation-slave")?.childNodes.forEach((el) => {
                const toolEl = (el as HTMLElement).querySelector(".automation-slave-tool") as HTMLImageElement
                toolEl.animate(toolAnimation[1], {duration: 0, fill: "forwards"})
            })

            if(this.interval) clearInterval(this.interval)
            this.interval = setInterval(() => {
                document.getElementById("automation-slave")?.childNodes.forEach((el) => {
                    const toolEl = (el as HTMLElement).querySelector(".automation-slave-tool") as HTMLImageElement
                    toolEl.animate(toolAnimation[0], toolAnimation[2])
                    setTimeout(() => {
                        toolEl.animate(toolAnimation[1], toolAnimation[2])
                    }, toolAnimation[2].duration as number)
                })
                
                setTimeout(() => {
                    destroy(true, this.power*this.count)
                }, toolAnimation[2].duration as number)
            }, 1000/this.speed)
        }, [tool])

        return <div id="automation-slave" key={this.name}>
            {new Array(this.count).fill(0).map((_, i) => 
                <div 
                    key={i}
                    style={{
                        left: blockradius * Math.cos(2 * Math.PI * i / this.count) + "em",
                        top: blockradius * Math.sin(2 * Math.PI * i / this.count) + "em",
                        transform: `rotate(${i/this.count*360}deg) scale(${10/this.count > 1 ? 1 : 10/this.count})`
                    }}
                    className="automation-slave"
                >
                    <img src={this.getTexture()} className="automation-slave-villager" draggable={false}/>
                    <img className="automation-slave-tool" src={tool.getTexture()} draggable={false}/>
                </div>
            )}
        </div>
    }
}

export class CreeperSpawner extends Automation implements IAutomation{
    static readonly id = "creeper_spawner"

    constructor(power?: number){
        super(CreeperSpawner.id, 1, power ?? 1)
    }

    getElement(){
        const destroy = useContext(DestroyContext)

        useEffect(() => {
            const duration = 500

            if(this.interval) clearInterval(this.interval)

            this.interval = setInterval(() => {
                for(let i = 0; i < this.count; i++){
                    const el = document.createElement("img")
                    el.classList.add("automation-creeper-spawner-creeper")
                    el.src = "/automations/creeper_spawner/creeper.png"
                    document.getElementById("automation-creeper-spawner")?.appendChild(el)

                    el.animate([
                        {transform: `translate(${Math.random() * 20 - 10}em, ${Math.random() * -100}%)`},
                        {transform: `translate(${Math.random() * 20 - 10}em, calc(45vh + ${Math.random() * -100}%))`},
                    ], {duration, fill: "forwards"})

                    setTimeout(() => {
                        el.remove()
                    }, duration)
                }
                
                setTimeout(() => {
                    destroy(false, this.power * this.count)
                }, duration)
            }, 1000/this.speed)
        }, [])

        return <div key="creeper_spawner" id="automation-creeper-spawner">
            <img src={this.getTexture()} draggable={false}/>
        </div>
    }
}

export const AutomationList = {
    slave: Slave,
    creeper_spawner: CreeperSpawner,
}

export type AutomationName = keyof typeof AutomationList 