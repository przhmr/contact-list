import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom'
import Home from './components/pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Header from '../src/components/header'
import Footer from '../src/components/footer'
import Content from './components/content'
import UserContext from '../src/context/userContext'
import {ContactsContext} from '../src/context/contactContext';
import 'bootstrap/dist/css/bootstrap.min.css';


import Axios from 'axios'


function App() {

   

  const [userData, setUserData]= useState({

    token: undefined,
    user: undefined


  })


  const [productsc, setProductsc] = useState("");

  useEffect(()=>{

    
    const checkLoggedIn = async()=>{
    let token = localStorage.getItem("auth-token");
    if (token === null){
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post(
       
      "http://localhost:5000/users/tokenisValid", 
      null,
      {headers: {"x-auth-token" : token }}
      );
      
    

    if (tokenRes.data){

    const userRes = await Axios.get(
      "http://localhost:5000/users/", 
      {headers: {"x-auth-token":token}
         
      });

      setUserData({
        token,
        user: userRes.data,


      });

    }
    };

    checkLoggedIn()

    

  }, []);


  return (

    <>
    
    <BrowserRouter>
<UserContext.Provider value={{userData,setUserData}}> 
<ContactsContext.Provider value={[productsc, setProductsc]}>

<div >
<Header />
<Content/>
    <Footer/>

    </div>
    
    </ContactsContext.Provider>
    </UserContext.Provider>
    </BrowserRouter>
    
    </>



   
  );
}

export default App;