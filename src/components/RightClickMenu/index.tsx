import { CSSProperties } from "react";

interface Props{
    buttons: {name: string, action: () => void, style?: CSSProperties}[]
}

export function RightClickMenu({buttons}: Props) {
    return (<dialog className="rightclick-menu">
        
    </dialog>);
}

export function useRightClickMenu(){

}