import { useNavigate } from "react-router-dom";
import { AddContactForm } from "../components/AddContactForm";




export const AddContact = () => {

    const navigate = useNavigate();

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center pt-5">
          <div className="row  justify-content-center">
            <div className="row d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>
                        See agenda
                    </button>
            </div>
         </div>
            <div className="col-md-8">
              <AddContactForm />
            </div>
          </div>
      );
};