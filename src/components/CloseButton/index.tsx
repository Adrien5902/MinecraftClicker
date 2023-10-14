import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'
import {} from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle';

interface Props{
    onClick?: () => unknown
}

export default function CloseButton({onClick}: Props) {
    return (<span onClick={onClick} className='close-btn'>
        <FontAwesomeIcon icon={faXmarkCircle}/>
    </span>);
}