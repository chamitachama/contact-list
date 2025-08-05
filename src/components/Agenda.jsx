import { ContactCard } from "./ContactCard";
import { useNavigate } from "react-router-dom";




export const Agenda = () => {
    const navigate = useNavigate()


    return (
        
        <div>
            <ContactCard />

        </div>

    )
}