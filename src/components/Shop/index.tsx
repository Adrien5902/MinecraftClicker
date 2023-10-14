import CloseButton from "../CloseButton";

interface Props{
    close: () => unknown
}

export default function Shop({close}: Props) {
    return (<>
    <CloseButton onClick={close}/>
    <div id="shop">
        
    </div>
    </>);
}