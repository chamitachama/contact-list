import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";


export const AddContactForm = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (isEditing) {
      const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name || "",
          address: contactToEdit.address || "",
          phone: contactToEdit.phone || "",
          email: contactToEdit.email || ""
        });
      }
    }
  }, [isEditing, id, store.contacts]);

  const handleChange = (event) => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        isEditing
          ? `https://playground.4geeks.com/contact/agendas/gens/contacts/${id}`
          : "https://playground.4geeks.com/contact/agendas/gens/contacts",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) throw new Error("Error al guardar el contacto");

      const data = await response.json();

      dispatch({
        type: isEditing ? "edit_contact" : "add_contacts",
        payload: data
      });

      navigate("/");
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  return (
    <div className="row">
      <form className="col align-self-center" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            id="floatingName"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="floatingName">Contact Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            id="floatingAddress"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
          />
          <label htmlFor="floatingAddress">Contact Address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="phone"
            className="form-control"
            id="floatingPhone"
            placeholder="6666 6666"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="floatingPhone">Phone Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        <button className="btn btn-success" type="submit">
          {isEditing ? "Save Changes" : "Save Contact"}
        </button>
      </form>
    </div>
  );
};
