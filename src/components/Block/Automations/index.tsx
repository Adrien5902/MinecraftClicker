import { IAutomation } from "../../../types/Automation";
import { Tool } from "../../../types/Tool";

interface Props{
    automations: IAutomation[]
    currentTool: Tool
}

export default function AutomationsElement({automations, currentTool}: Props) {
    return (<div id="automations">
        {automations.map((a) => a.getElement(currentTool))}
    </div>);
}