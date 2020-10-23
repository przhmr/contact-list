import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import ErrorNotice from "../misc/errorNotice";
import Button from 'react-bootstrap/Button';
import UserContext from "../../context/userContext";
import {ContactsContext} from "../../context/contactContext";



import Contacts from '../contacts'
import AddButton from '../addButton';



 function Home(){

const [contacts, setContacts]= useState({
  email: "",
  firstName: "",
  lastName: "",
  contactNumber: "",
})


const [contactsc, setContactsc] = useContext(ContactsContext);

const [items, setItems]= useState([]);


const {userData}= useContext(UserContext);
const history = useHistory();
const {token, user} = userData;


const baseUrl = `http://localhost:5000/contacts/all` 

async function getContacts() {

  var myheaders= ({

    "x-auth-token": token, 
    "Content-Type": "application/json"
  })
  
  try{


const response = await Axios({

url: baseUrl,
headers: myheaders,
method: "GET"
})

return response.data;


}

catch(err){
console.log(err)

}
}
   

  
useEffect(()=>
{

  
  
  if (!userData.user) 

    history.push("/login");

async function loadContacts(){

  
const response = await getContacts()

if(response){


setContactsc(response)
setItems(response)



}
else{

  console.log("hay un error")
}


}


loadContacts()


  
console.log(token);
 },[])



 const submit = async (e) => {
    
  e.preventDefault();
  
   
  try {
    
        
       

    await Axios.post('http://localhost:5000/contacts',{contacts}, {headers: {"x-auth-token": token, "Content-Type": "application/json"}} );
    
    


  } catch (err) {
    console.error(err);
    
  }
};


return(
  <>



<div> This is Home</div>

<AddButton/>

 



        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          value= {contacts.email}
          onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value= {contacts.firstName}
          onChange={(e) => setContacts({ ...contacts, firstName: e.target.value })}
        />

<label htmlFor="price">Last Name</label>
        <input
          id="lastName"
          value= {contacts.lastName}
          onChange={(e) => setContacts({ ...contacts, lastName: e.target.value })}
        />

<label htmlFor="price">Contact Number</label>
        <input
          id="contactNumber"
          value= {contacts.contactNumber}
          onChange={(e) => setContacts({ ...contacts, contactNumber: e.target.value })}
        />
        
        

        <Button variant="primary" size="lg" block onClick={submit} className='btn center'>Enviar</Button>
        

  

    <Contacts items={items}/>

 
</>


)

}

export default Home;