import React, { useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";




export const ContactCard = () => {   

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/gens/contacts/${contactId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.status}`);
      }

      dispatch({ type: "delete_contact", payload: contactId });
      console.log(`Contact ${contactId} deleted`);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }};

    

  useEffect(()=>{
      const fetchContacts = async () => {
          try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/gens");
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);


            const contacts = data.contacts || [];
          
            dispatch({ type: "set_contacts", payload: contacts });            
          } catch (error) {
            console.error("Error fetching agendas:", error);
          }
        }
        
        fetchContacts();

  }, [dispatch]); 

    return (
        <div className="container mt-4">
          {store.contacts && store.contacts.length > 0 ? (
            store.contacts.map((contact) => (
              <div key={contact.id} className="row mb-3 p-3 border rounded bg-white shadow-sm">
                <div className="col">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6onp_Iet4tM91LftudjOOQgK2raS-JkNjA&s" alt="Contact" className="img-fluid" />
                </div>
                <div className="col-8">
                  <div><strong>Name:</strong> {contact.name}</div>
                  <div><strong>Address:</strong> {contact.address}</div>
                  <div><strong>Phone:</strong> {contact.phone}</div>
                  <div><strong>Email:</strong> {contact.email}</div>
                </div>
                <div className="col d-flex flex-column justify-content">
                  <button className="btn col-8 btn-danger mb-2" onClick={()=>handleDelete(contact.id)}>Delete</button>
                  <button className="btn col-8 btn-secondary"
                  onClick={() => navigate(`/edit-contact/${contact.id}`)}> Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No contacts found.</p>
          )}
        </div>
      );

}