import React,{useContext} from 'react'
import AddButton from '../components/addButton'
import ItemEditModal from './pages/editButtonModal';



export default function  Contacts (props){

return(

    <ul >
    {props.items.map((item) => (

      <>
      <div  >
     
     
      <li key= "email" >{item.email}</li>
      <li key= "firstName">{item.firstName}</li>
      <li key= "lastName" >$ {item.lastName}</li>
      <li key= "contactNumber" >$ {item.contactNumber}</li>
      
      <ItemEditModal item={item}/>


       </div>
      
      
      </>
    ))}
  </ul>


)


}