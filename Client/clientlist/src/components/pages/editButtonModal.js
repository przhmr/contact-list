import React,{useContext} from "react"
import { Link } from 'react-router-dom';
import {ContactsContext} from "../../context/contactContext";
import UserContext from "../../context/userContext";
import Axios from 'axios';



 function ItemEditModal(props){

  const {userData}= useContext(UserContext);
  const {token, user} = userData;
  let [contactsc, setContactsc] = useContext(ContactsContext);
  const [showModal, setShowModal] = React.useState(false);  
  
  let contactsm = contactsc || {};
  

  const test=()=>{

    console.log( contactsc)
    console.log( token)
    console.log(user.id)
  

  }

  const borrar =async (e,id )=>{
    
try{

  var url= new URL('http://localhost:5000/contacts/')

  url.searchParams.append("id",user.id)
  
  const res = await Axios.delete(url,{contactsc}, {headers: {"x-auth-token": token, "Content-Type": "application/json"}} );
  console.log(res.data) 

}

catch(err){
  console.error(err);

}

  }
 

return(

    <>
    
    <button onClick={() => setShowModal(true)}>
       Edit
       
      
  	</button>
    {showModal ? (<> 
    <div
      
      
    >
      <div >
        {/*content*/}
        <div >
          {/*header*/}
          <div >
            <h3 >
              Edit Contact
            </h3>
            <button
              
              onClick={() => setShowModal(false)}
            >
              <span>
                x
              </span>
            </button>
          </div>
          {/*body*/}
          <div >
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
             

              
        <label htmlFor="title">email</label>
        <input
          id="email"
          type="text"
          value= {contactsm.email}
          onChange={(e) => setContactsc({ ...contactsm, email: e.target.value })}
        />
              

        

        <label htmlFor="description">First Name</label>
        <input
          id="firstName"
          type="text"
          value= {contactsm.firstName}
          onChange={(e) => setContactsc({ ...contactsm, firstName: e.target.value })}
        />

<label htmlFor="price">Last Name</label>
        <input
          id="lastName"
          value= {contactsm.lastName}
          onChange={(e) => setContactsc({ ...contactsm, lastName: e.target.value })}
        />
        
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          value= {contactsm.contactNumber}
          onChange={(e) => setContactsc({ ...contactsm, contactNumber: e.target.value })}
        />
        

        <button onClick={test} className='btn center'>Apply</button>       
        <button onClick={borrar} className= 'btn center'> Erase </button>     


            </p>
          </div>
          
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            
                 
            
            
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

  </>) : null}
    
</>


)

                      }


export default ItemEditModal;