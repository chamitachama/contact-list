export const initialStore=()=>{
  return{
    message: null,
   
    contacts: [
      {
        id: 1,
        name: "",
        address: "",
        phone: "",
        email: ""
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
      
    case "add_contacts":
      const {name, address, phone, email } = action.payload
      const newContact = { name, address, phone, email };

    return{
      ...store,
      contacts: [...store.contacts, newContact] 
    }
    case "set_contacts":
      return { ...store, contacts: action.payload };    
    
    case "delete_contact":
      return{ ...store, 
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };
    case "edit_contact":
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };    
    
    default:
      throw Error('Unknown action.');
  }    
    
}
