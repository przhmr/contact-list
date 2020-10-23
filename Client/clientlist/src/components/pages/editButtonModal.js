import React,{useContext} from "react"
import { Link } from 'react-router-dom';
import {ContactsContext} from "../../context/contactContext";
import UserContext from "../../context/userContext";
import Axios from 'axios';



 function ItemEditModal(props){

  const {userData}= useContext(UserContext);
  const {token, user} = userData;
  let [contactsc, setContactsc] = useContext(ContactsContext);
  /* const {  } = useContext(CartContext); */
  const [showModal, setShowModal] = React.useState(false);  
  
  let contactsm = contactsc || {};
  

  const test=()=>{

    console.log( contactsc[0])

  }

  const borrar =async (e,id )=>{
    
try{

  
  
  const res = await Axios.delete('http://localhost:5000/items/${id}',{contactsc}, {headers: {"x-auth-token": token, "Content-Type": "application/json"}} );
  console.log(res.data) 

}

catch(err){
  console.error(err);

}

  }
 

return(

    <>
    
    <button onClick={() => setShowModal(true)} className=' '>
       Editar
       
      
  	</button>
    {showModal ? (<> 
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-xl font-semibold">
              Editar Articulo
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-xl block outline-none focus:outline-none">
                x
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
             

              
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value= {contactsm.title}
          onChange={(e) => setContactsc({ ...contactsm, title: e.target.value })}
        />
              

        

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value= {contactsm.description}
          onChange={(e) => setContactsc({ ...contactsm, description: e.target.value })}
        />

<label htmlFor="price">Price</label>
        <input
          id="price"
          value= {contactsm.price}
          onChange={(e) => setContactsc({ ...contactsm, price: e.target.value })}
        />
        
        {/* <span>Browse</span>
        <input type='file'
         name='image' 
         onChange ={(e)=> setImage(e.target.files[0])} />
         */}

        <button onClick={test} className='btn center'>Enviar</button>       
        <button onClick={borrar} className= 'btn center'> Borrar </button>     


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